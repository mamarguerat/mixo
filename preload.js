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

function selectTopDiv(ele) {
  while (!ele.classList.contains('device') && !ele.classList.contains('AES50') && ele.tagName != "INPUT") {
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

function enableDragging(ele) {
  var dragging = dragging || false,
    x, y, Ox, Oy,
    current;
  enableDragging.z = enableDragging.z || 1;
  ele.onmousedown = function (ev) {
    current = selectTopDiv(ev.target);
    console.log(current)

    if (current.classList.contains('AES50')) {
      // Create line to connect
      window.onmousemove = function (ev) {
        fromID = current.parentElement.id
        document.getElementById("lines").innerHTML = "<path class='line' d='M" + (devices[fromID].x + 58) + "," + devices[fromID].y +
          " C " + (devices[fromID].x + 58) + "," + (devices[fromID].y - 80) +
          " " + (ev.clientX + 0) + "," + (ev.clientY - 80) +
          " " + (ev.clientX + 0) + "," + ev.clientY +
          "' stroke='black' fill='transparent'/>";
          links.forEach(link => {
            document.getElementById("lines").innerHTML += link.show();
          })
        
        window.onmouseup = function (ev2) {
          console.log(ev2)
          target = selectTopDiv(ev2.target)
          console.log(current.classList[1])
          console.log(target.classList[1])
          toID = target.parentElement.id
          links.push(new Link(devices[fromID], current.classList[1], devices[toID], target.classList[1]))
          drawLine();
        }
      };
    }
    else if (current.classList.contains('device')) {
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
          current.style.top = Math.round(Sy / 10) * 10 + "px";
          current.style.left = Math.round(Sx / 10) * 10 + "px";
          //draw();
          devices[current.id].move(parseInt(current.style.left, 10), parseInt(current.style.top, 10));
          drawLine()
          return false;
        }
      };
      window.onmouseup = function (ev) {
        dragging && (dragging = false);
        devices[current.id].move(parseInt(current.style.left, 10), parseInt(current.style.top, 10));
        drawLine()
      }
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
  // if (devices.length == 2) links.push(new Link(devices[0], AES50.A, devices[1], AES50.A));
  // if (devices.length == 3) links.push(new Link(devices[1], AES50.B, devices[2], AES50.A));

  draw();

  var ele = document.getElementsByClassName("device");
  for (var i = 0; i < ele.length; i++) {
    enableDragging(ele[i]);
    enableDoubleClick(ele[i]);
    enableRightClick(ele[i]);
  }
})