const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

const publicPath =
  process.env.NODE_ENV === 'development'
    ? path.join(__dirname, './public')
    : path.join(process.resourcesPath, 'public');
const imagesPath = path.join(publicPath, "assets", "images");

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
      return "<div id='" + this.id +
        "' class='device " + this.type +
        "' style='top: " + this.y +
        "px; left: " + this.x +
        "px;'><img draggable='false' src='" + path.join(imagesPath, this.type + ".svg") +
        "'><input type='text' value='" + this.name +
        "'></div>";
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

function selectTopDiv(ele) {
  while (!ele.classList.contains('device') && ele.tagName != "INPUT") {
    ele = ele.parentElement;
  }
  return ele;
}

function draw() {
  console.log("DRAW");
  console.log(devices);
  document.getElementById("canvas").innerHTML = "";
  devices.forEach(device => {
    document.getElementById("canvas").innerHTML += device.show();
  })
}


function enableDragging(ele) {
  var dragging = dragging || false,
    x, y, Ox, Oy,
    current;
  enableDragging.z = enableDragging.z || 1;
  ele.onmousedown = function (ev) {
    current = selectTopDiv(ev.target);
    dragging = true;
    x = ev.clientX;
    y = ev.clientY;
    Ox = current.offsetLeft;
    Oy = current.offsetTop;
    current.style.zIndex = ++enableDragging.z;

    window.onmousemove = function (ev) {
      if (dragging == true) {
        var Sx = ev.clientX - x + Ox,
          Sy = ev.clientY - y + Oy;
        if (Sx < 0) Sx = 0;
        if (Sy < 0) Sy = 0;
        current.style.top = Sy + "px";
        current.style.left = Sx + "px";
        return false;
      }
    };
    window.onmouseup = function (ev) {
      dragging && (dragging = false);
      devices[current.id].move(parseInt(current.style.left, 10), parseInt(current.style.top, 10));
      //draw();
    }
  };
}

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

  draw();

  var ele = document.getElementsByClassName("device");
  for (var i = 0; i < ele.length; i++) {
    enableDragging(ele[i]);
    enableDoubleClick(ele[i]);
    enableRightClick(ele[i]);
  }
})