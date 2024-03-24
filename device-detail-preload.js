const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
const Constants = require('./const.js')


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
  document.getElementById("canvas").innerHTML += "<div id='device' class='device detail " + arg + "' style='top: 0px; left: 0px;'><object id='svg' class='detail' draggable='false' data='" + path.join(Constants.imagesPath, arg + ".svg") + "' type='image/svg+xml'></div>";
});