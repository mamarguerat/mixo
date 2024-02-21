const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

const publicPath =
  process.env.NODE_ENV === 'development'
    ? './public'
    : path.join(process.resourcesPath, 'public');
const imagesPath = path.join(publicPath, "assets", "images");

function selectTopDiv(ele) {
  while (!ele.classList.contains('device') && ele.tagName != "INPUT") {
    ele = ele.parentElement;
  }
  return ele;
}

function enableDoubleClick(ele) {
  ele.ondblclick = function (ev) {
    current = selectTopDiv(ev.target);
  }
}

function enableRightClick(ele) {
  ele.oncontextmenu = function (ev) {
    current = selectTopDiv(ev.target);
  }
}

ipcRenderer.on('type', (event, arg) => {
  console.log(arg)
  document.getElementById("canvas").innerHTML += "<div id='0' class='device detail " + arg + "' style='top: 0px; left: 0px;'><img class='detail' draggable='false' src='" + path.join(imagesPath, arg + ".svg") + "'></div>";
});