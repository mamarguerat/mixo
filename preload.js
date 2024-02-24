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


    this.AES50A = id;
    this.AES50B = id;
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

  //delete() {
  //  this.visible = false;
  //}
}

class Link {
  constructor(dev1, aes50_1, dev2, aes50_2) {
    this.device1 = dev1;
    this.device2 = dev2;
    this.aes50_1 = aes50_1;
    this.aes50_2 = aes50_2;

    aes50_1 == AES50.A ? devices[dev1.id].AES50A = dev2.id : devices[dev1.id].AES50B = dev2.id;
    aes50_2 == AES50.A ? devices[dev2.id].AES50A = dev1.id : devices[dev2.id].AES50B = dev1.id;
  }

  delete() {
    aes50_1 == AES50.A ? devices[dev1.id].AES50A = dev1.id : devices[dev1.id].AES50B = dev1.id;
    aes50_2 == AES50.A ? devices[dev2.id].AES50A = dev2.id : devices[dev2.id].AES50B = dev2.id;
  }

  show() {
    this.x1offset = this.aes50_1 == AES50.A ? 58 : 78;
    this.x2offset = this.aes50_2 == AES50.A ? 58 : 78;
    //return "<line class='line' x1='" + (devices[this.device1].x + 58) + "' y1='" + devices[this.device1].y + "' x2='" + (devices[this.device2].x + 58) + "' y2='" + devices[this.device2].y + "' stroke='black' fill='transparent'/>";
    return "<path class='line' d='M" + (this.device1.x + this.x1offset) + "," + this.device1.y +
      " C " + (this.device1.x + this.x1offset) + "," + (this.device1.y - 80) +
      " " + (this.device2.x + this.x2offset) + "," + (this.device2.y - 80) +
      " " + (this.device2.x + this.x2offset) + "," + this.device2.y +
      "' stroke='black' fill='transparent'/>";
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
let selectedAES = null;
let originX, originY, mouseX, mouseY;

function selectTopDiv(ele) {
  while (ele.tagName != "BODY" && !ele.classList.contains('device') && !ele.classList.contains('AES50') && ele.tagName != "INPUT") {
    ele = ele.parentElement;
  }
  return ele;
}

function draw() {
  console.log("DRAW");
  console.log(devices);
  console.log(links);
  document.getElementById("canvas").innerHTML = "<svg id='lines' class='lines'></svg>";
  devices.forEach(device => {
    document.getElementById("canvas").innerHTML += device.show();
  })
  drawLine();
}

function drawLine() {
  document.getElementById("lines").innerHTML = "";
  links.forEach(link => {
    document.getElementById("lines").innerHTML += link.show();
  })
}

function enableClick(ele) {
  console.log("enableDragging")
  console.log(ele)
  ele.addEventListener("mousedown", (ev) => {
    element = selectTopDiv(ev.target)
    if (element.classList.contains('AES50')) {
      selectedElement = element;
    }
    else if (element.classList.contains('device')) {
      selectedElement = element;  // Select element
      console.log("Element selected: " + selectedElement.id)
      originX = selectedElement.offsetLeft;
      originY = selectedElement.offsetTop;
      mouseX = ev.clientX;
      mouseY = ev.clientY;
    }
  });
}
  
window.addEventListener("mousemove", (ev) => {
  if (selectedElement == null) return;
  if (selectedElement.classList.contains('AES50')) {
    fromID = selectedElement.parentElement.id
    document.getElementById("lines").innerHTML = "<path class='line' d='M" + (devices[fromID].x + 58) + "," + devices[fromID].y +
      " C " + (devices[fromID].x + 58) + "," + (devices[fromID].y - 80) +
      " " + (ev.clientX + 0) + "," + (ev.clientY - 80) +
      " " + (ev.clientX + 0) + "," + ev.clientY +
      "' stroke='black' fill='transparent'/>";
      links.forEach(link => {
        document.getElementById("lines").innerHTML += link.show();
      })
  }
  else if (selectedElement.classList.contains('device')) {
    console.log(selectedElement)
    var Sx = ev.clientX - mouseX + originX,
      Sy = ev.clientY - mouseY + originY;
    if (Sx < 0) Sx = 0;
    if (Sy < 0) Sy = 0;
    selectedElement.style.top = Math.round(Sy / 10) * 10 + "px";
    selectedElement.style.left = Math.round(Sx / 10) * 10 + "px";
    devices[selectedElement.id].move(parseInt(selectedElement.style.left, 10), parseInt(selectedElement.style.top, 10));
    drawLine()
  }
});

window.addEventListener("mouseup", (ev) => {
  if (selectedElement.classList.contains('AES50')) {
    console.log(ev)
    target = selectTopDiv(ev.target)
    console.log(selectedElement.classList[1])
    console.log(target.classList[1])
    toID = target.parentElement.id
    links.push(new Link(devices[fromID], selectedElement.classList[1], devices[toID], target.classList[1]))
    drawLine();
  }
  else if (selectedElement.classList.contains('device')) {
    devices[selectedElement.id].move(parseInt(selectedElement.style.left, 10), parseInt(selectedElement.style.top, 10));
    drawLine()
    selectedElement = null; // Unselect element
  }
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
    //devices[current.id].delete();
  }
}

ipcRenderer.on('menu', (event, arg) => {
  devices.push(new Device(10, 10, arg, devices.length, arg));
  // if (devices.length == 2) links.push(new Link(devices[0], AES50.A, devices[1], AES50.A));
  // if (devices.length == 3) links.push(new Link(devices[1], AES50.B, devices[2], AES50.A));

  draw();

  var ele = document.getElementsByClassName("device");
  for (var i = 0; i < ele.length; i++) {
    enableClick(ele[i]);
    enableDoubleClick(ele[i]);
    enableRightClick(ele[i]);
  }
});