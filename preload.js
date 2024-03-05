const { contextBridge, ipcRenderer } = require('electron');
const { link } = require('fs');
const path = require('path')

// Uncomment for npm start command
// process.env.NODE_ENV = 'development'

const publicPath =
  process.env.NODE_ENV === 'development'
    ? './public'
    : path.join(process.resourcesPath, 'public');
const imagesPath = path.join(publicPath, "assets", "images");

const AES50 = {
  A: "A",
  B: "B"
};

class Device {
  constructor(x, y, type, id, name) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.id = id;
    this.name = name;
    this.visible = true;
  }

  show() {
    if (this.visible)
    {
      return "<div id='" + this.id +
        "' class='device " + this.type +
        "' style='top: " + this.y +
        "px; left: " + this.x + "px;'>" +
        "<div class='AES50 A' style='left: 50px; top: 0px;'>A</div>" +
        "<div class='AES50 B' style='left: 70px; top: 0px;'>B</div>" +
        "<img draggable='false' src='" + path.join(imagesPath, this.type + ".svg") +
        "'><input type='text' value='" + this.name + "'></div>";
    }
    else return "";
  }

  move(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  delete() {
    this.visible = false;
    links.forEach(link => {
      // if link on the device to delete
      if ((this.id == link.device1) || (this.id == link.device2)) {
        link.delete()
      }
    });
  }
}

class Link {
  constructor(dev1, aes50_1, dev2, aes50_2) {
    this.valid = true
    this.device1 = dev1;
    this.device2 = dev2;
    this.aes50_1 = aes50_1;
    this.aes50_2 = aes50_2;
    this.check();
  }

  /// Check if link is valable
  check() {
    links.forEach((link, index, fullArray) => {
      // if link already on aes50
      if ((this.device1 == link.device1 && this.aes50_1 == link.aes50_1) ||
          (this.device1 == link.device2 && this.aes50_1 == link.aes50_2) ||
          (this.device2 == link.device1 && this.aes50_2 == link.aes50_1) ||
          (this.device2 == link.device2 && this.aes50_2 == link.aes50_2)) {
        links.splice(index, 1);
      }
    });
  }

  delete() {
    this.valid = false;
    this.device1 = -1;
    this.aes50_1 = -1;
    this.device2 = -1;
    this.aes50_2 = -2;
  }

  show() {
    if (this.valid) {
      let x1offset = this.aes50_1 == AES50.A ? 58 : 78;
      let x2offset = this.aes50_2 == AES50.A ? 58 : 78;
      //return "<line class='line' x1='" + (devices[this.device1].x + 58) + "' y1='" + devices[this.device1].y + "' x2='" + (devices[this.device2].x + 58) + "' y2='" + devices[this.device2].y + "' stroke='black' fill='transparent'/>";
      return "<path class='line' d='M" + (devices[this.device1].x + x1offset) + "," + devices[this.device1].y +
        " C " + (devices[this.device1].x + x1offset) + "," + (devices[this.device1].y - 80) +
        " " + (devices[this.device2].x + x2offset) + "," + (devices[this.device2].y - 80) +
        " " + (devices[this.device2].x + x2offset) + "," + devices[this.device2].y +
        "' stroke='black' fill='transparent'/>";
    }
  }
}
/*
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
})
*/

let devices = [];
let links = [];
let selectedElement = null;
let originX, originY, mouseX, mouseY;
let idCnt = 0;

function id2index(id, list) {
  return list.findIndex((element) => Number(element.id) === Number(id));
}

function selectTopDiv(ele) {
  while (ele.tagName != "BODY" && !ele.classList.contains('device') && !ele.classList.contains('AES50') && ele.tagName != "INPUT") {
    ele = ele.parentElement;
  }
  return ele;
}

function draw() {
  document.getElementById("canvas").innerHTML = "<svg id='lines' class='lines'></svg>";
  devices.forEach(device => {
    document.getElementById("canvas").innerHTML += device.show();
  })
  drawLine();

  var ele = document.getElementsByClassName("device");
  for (var i = 0; i < ele.length; i++) {
    enableClick(ele[i]);
    enableDoubleClick(ele[i]);
    enableRightClick(ele[i]);
  }
}

function drawLine() {
  document.getElementById("lines").innerHTML = "";
  links.forEach(link => {
    document.getElementById("lines").innerHTML += link.show();
  })
}

function enableClick(ele) {
  ele.addEventListener("mousedown", (ev) => {
    element = selectTopDiv(ev.target)
    if (element.classList.contains('AES50')) {
      selectedElement = element;
      fromID = selectedElement.parentElement.id
      fromAES50 = selectedElement.classList[1]
      links.forEach((link, index, fullArray) => {
        if ((link.device1 == fromID && link.aes50_1 == fromAES50) ||
            (link.device2 == fromID && link.aes50_2 == fromAES50)) {
          links.splice(index, 1);
        }
      });
    }
    else if (element.classList.contains('device')) {
      selectedElement = element;  // Select element
      originX = selectedElement.offsetLeft;
      originY = selectedElement.offsetTop;
      mouseX = ev.clientX;
      mouseY = ev.clientY;
    }
  });
}
  
window.addEventListener("mousemove", (ev) => {
  drawLine()
  if (selectedElement == null) return;
  if (selectedElement.classList.contains('AES50')) {
    fromID = selectedElement.parentElement.id
    fromAES50 = selectedElement.classList[1]
    xoffset = fromAES50 == AES50.A ? 58 : 78;
    document.getElementById("lines").innerHTML = "<path class='line' d='M" + (devices[id2index(fromID, devices)].x + xoffset) + "," + devices[id2index(fromID, devices)].y +
      " C " + (devices[id2index(fromID, devices)].x + xoffset) + "," + (devices[id2index(fromID, devices)].y - 80) +
      " " + (ev.clientX + 0) + "," + (ev.clientY - 80) +
      " " + (ev.clientX + 0) + "," + ev.clientY +
      "' stroke='black' fill='transparent'/>";
    links.forEach(link => {
      document.getElementById("lines").innerHTML += link.show();
    })
  }
  else if (selectedElement.classList.contains('device')) {
    var Sx = ev.clientX - mouseX + originX,
      Sy = ev.clientY - mouseY + originY;
    if (Sx < 0) Sx = 0;
    if (Sy < 0) Sy = 0;
    selectedElement.style.top = Math.round(Sy / 10) * 10 + "px";
    selectedElement.style.left = Math.round(Sx / 10) * 10 + "px";
    index = id2index(selectedElement.id, devices);
    devices[index].move(parseInt(selectedElement.style.left, 10), parseInt(selectedElement.style.top, 10));
    drawLine()
  }
});

window.addEventListener("mouseup", (ev) => {
  if (selectedElement.classList.contains('AES50')) {
    target = selectTopDiv(ev.target)
    toID = target.parentElement.id
    if (fromID != toID)
    {
      links.push(new Link(devices[id2index(fromID, devices)].id, selectedElement.classList[1], devices[id2index(toID, devices)].id, target.classList[1]))
    }
    drawLine();
  }
  else if (selectedElement.classList.contains('device')) {
    index = id2index(selectedElement.id, devices);
    devices[index].move(parseInt(selectedElement.style.left, 10), parseInt(selectedElement.style.top, 10));
    drawLine()
  }
  selectedElement = null; // Unselect element
});

function enableDoubleClick(ele) {
  ele.ondblclick = function (ev) {
    current = selectTopDiv(ev.target);
    ipcRenderer.send('window', devices[current.id].type);
  }
}

function enableRightClick(ele) {
  ele.oncontextmenu = function (ev) {
    current = selectTopDiv(ev.target);
    devices[id2index(current.id, devices)].delete();
    devices.splice(id2index(current.id, devices), 1);
    draw();
  }
}

ipcRenderer.on('menu', (event, arg) => {
  devices.push(new Device(10, 10, arg, idCnt++, arg));
  // if (devices.length == 2) links.push(new Link(devices[0], AES50.A, devices[1], AES50.A));
  // if (devices.length == 3) links.push(new Link(devices[1], AES50.B, devices[2], AES50.A));

  draw();
});