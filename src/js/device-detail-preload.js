const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
const Connector = require('./connector.js')
const Constants = require('./const.js')

var modal;
var overlay;
var closeModalBtn;

function selectTopDiv(ele) {
  while (!ele.classList.contains('device') && ele.tagName != "INPUT") {
    ele = ele.parentElement;
  }
  return ele;
}

const openModal = function (io) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.getElementById("modal-title").innerHTML = io.device.name + " - " + io.input + " " + io.port;
  document.getElementById("channel-name").value = io.name;
  $(document).find('#color-list').attr('data-selected', io.color);
  selectColor(io.color);
  selectIcon(io.icon);
  $(document).find('#channel-phase').attr('checked', io.phaseInvert);
  $(document).find('#channel-invert').attr('checked', io.colorInvert);
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

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

function changeXLR(XLR, icon, color, name) {
  connector = XLR.querySelector('#connector');
  circle = "<circle id='back' r='39.5' cx='39.5' cy='39.5' fill='" + color + "' />"
  connector.innerHTML = circle.outerHTML;
  // TODO: Save channel values in database
  //https://www.svgviewer.dev/
}

function selectColor(id) {
  let $selected = $(document).find('#color-list').find(':button[value="' + id + '"]');
  let $selectedValue = $selected.val(); 
  let $icon          = $selected.find('svg');
  let $text          = $selected.find('span');
  let $btn           = $selected.closest('.dropdown-wrapper').find('.trigger-dropdown');

  $selected.closest('.dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
  $btn.find('span').remove();
  $btn.find('svg').remove();
  $btn.find('object').remove();
  $btn.prepend($text[0].outerHTML);
  $btn.prepend($icon[0].outerHTML);
}

function selectIcon(id) {
  let $selected = $(document).find('#icon-list').find(':button[value="' + id + '"]');
  let $selectedValue = $selected.val();
  let $icon         = $selected.find('object');
  let $text          = $selected.find('span');
  let $btn           = $selected.closest('.dropdown-wrapper').find('.trigger-dropdown');

  $selected.closest('.dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
  $btn.find('span').remove();
  $btn.find('svg').remove();
  $btn.find('object').remove();
  $btn.prepend($text[0].outerHTML);
  $btn.prepend($icon[0].outerHTML);
}

ipcRenderer.on('type', (event, arg) => {
  console.log(arg)
  document.getElementById("canvas").innerHTML += "<div id='device' class='device detail " + arg.type + "' style='top: 0px; left: 0px;'><object id='svg' class='detail' draggable='false' data='" + path.join(Constants.imagesPath, arg.type + ".svg") + "' type='image/svg+xml'></div>";

  var svg = document.getElementById("svg");
  console.log(svg)
  svg.addEventListener("load", function (ev) {
    var inputs = svg.contentDocument.getElementById("Inputs").childNodes;
    inputs.forEach(input => {
      input.addEventListener("click", function (ev) {
        openModal(new Connector(arg, input.id.slice(5,7), "Input", "salut", "RD", true, "72", false, false));
        changeXLR(input);
      });
    });
    var outputs = svg.contentDocument.getElementById("Outputs").childNodes;
    outputs.forEach(output => {
      output.addEventListener("click", function (ev) {
        openModal(new Connector(arg, output.id.slice(5,7), "Output", "salut", "RD", true, "72", false, false));
        changeXLR(output);
      });
    });
  });
});

ipcRenderer.on('ready', (event, arg) => {
  modal = document.querySelector(".modal");
  overlay = document.querySelector(".overlay");
  closeModalBtn = document.querySelector(".btn-close");

  closeModalBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
});