const { contextBridge, ipcRenderer } = require('electron');
const { fs } = require('fs');
const path = require('path');
const Device = require('./device.js')
const Link = require('./link.js')

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
// TODO: Share variables with modules
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
    enableTextBox(ele[i], ele[i].children[3]);
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

function enableTextBox(parent, ele) {
  ele.addEventListener("keyup", (ev) => {
    deviceId = ev.target.parentElement.id;
    devices[id2index(deviceId, devices)].name = ev.target.value;
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

ipcRenderer.on('file', (event, arg) => {
  if ('save' == arg.function || 'saveas' == arg.function) {
    // Combine the arrays into an object
    let data = {
      devices: devices,
      links: links
    };
    // Convert the object to JSON
    let json = JSON.stringify(data, null, 2);
    ipcRenderer.send('file', {
      function: arg.function,
      json: json
    });
  }
  else if ('load' == arg.function) {
    devices = [];
    links = [];
    arg.devices.forEach(device => {
      devices.push(new Device(device.x, device.y, device.type, device.id, device.name));
    });
    arg.links.forEach(link => {
      links.push(new Link(link.device1, link.aes50_1, link.device2, link.aes50_2));
    })
    draw();
    idCnt = devices[devices.length - 1].id + 1;
  }
})