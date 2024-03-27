const { ipcRenderer } = require("electron");

const constants = new Const();
class IndexCtrl {
  constructor() {
    /* ----- IPC ----- */
    ipcRenderer.on('menu', (event, arg) => {
      this.menuClick(arg);
    })
    /* ----- DOM Event Listeners ----- */
    window.addEventListener("mousemove", (e) => {
      this.mouseMove(e);
    })
    window.addEventListener("mouseUp", (e) => {
      this.mouseUp(e);
    })
  }

  /**
   * Mouse up event handling
   * @param {Event} e 
   */
  mouseUp(e) {
    if (selectedElement.classList.contains('AES50')) {
      target = selectTopDiv(e.target)
      toID = target.parentElement.id
      if (fromID != toID)
      {
        links.push(new Link(devices[constants.id2index(fromID, devices)].id, selectedElement.classList[1], devices[Constants.id2index(toID, devices)].id, target.classList[1]))
        check(links);
      }
      drawLine();
    }
    else if (selectedElement.classList.contains('device')) {
      index = Constants.id2index(selectedElement.id, devices);
      devices[index].move(parseInt(selectedElement.style.left, 10), parseInt(selectedElement.style.top, 10));
      drawLine()
    }
    selectedElement = null; // Unselect element
  }

  /**
   * Mouse move event handling
   * @param {Event} e 
   */
  mouseMove(e) {
    // directly change DOM for selected element, save in Worker on mouseup
    drawLine()
    if (selectedElement == null) return;
    if (selectedElement.classList.contains('AES50')) {
      fromID = selectedElement.parentElement.id
      fromAES50 = selectedElement.classList[1]
      xoffset = fromAES50 == Constants.AES50.A ? 58 : 78;
      document.getElementById("lines").innerHTML = "<path class='line' d='M" + (devices[Constants.id2index(fromID, devices)].x + xoffset) + "," + devices[Constants.id2index(fromID, devices)].y +
        " C " + (devices[Constants.id2index(fromID, devices)].x + xoffset) + "," + (devices[Constants.id2index(fromID, devices)].y - 80) +
        " " + (e.clientX + 0) + "," + (e.clientY - 80) +
        " " + (e.clientX + 0) + "," + e.clientY +
        "' stroke='black' fill='transparent'/>";
      links.forEach(link => {
        document.getElementById("lines").innerHTML += link.show(devices);
      })
    }
    else if (selectedElement.classList.contains('device')) {
      var Sx = e.clientX - mouseX + originX,
        Sy = e.clientY - mouseY + originY;
      if (Sx < 0) Sx = 0;
      if (Sy < 0) Sy = 0;
      selectedElement.style.top = Math.round(Sy / 10) * 10 + "px";
      selectedElement.style.left = Math.round(Sx / 10) * 10 + "px";
      index = Constants.id2index(selectedElement.id, devices);
      devices[index].move(parseInt(selectedElement.style.left, 10), parseInt(selectedElement.style.top, 10));
      drawLine()
    }
  }

  /**
   * Menu action received from IPC
   * @param {*} arg 
   */
  menuClick(arg) {
    console.log("[indexCtrl] menu click " + arg.action);
    console.log(arg)
    if (arg.action === 'add')
    {
      console.log("[indexCtrl] add device");
      indexWrk.addDevice(arg.type);
    }
  }

  /**
   * Add devices to DOM
   * @param {Device[]} devices 
   */
  drawDevices(devices) {
    console.log("[indexCtrl] draw device");
    $('#canvas').empty();
    if (devices.length > 0)
    {
      devices.forEach(device => {
        $("#canvas").append(
          "<div deviceid='" + device.getId() +
          "' class='device " + device.getType() +
          "' style='top: " + device.getPosY() +
          "px; left: " + device.getPosX() + "px;'>" +
          "<div class='AES50 A' style='left: 50px; top: 0px;'>A</div>" +
          "<div class='AES50 B' style='left: 70px; top: 0px;'>B</div>" +
          "<img draggable='false' src='" + path.join(constants.imagesPath, device.getType() + ".svg") +
          "'><input type='text' value='" + device.getName() + "'></div>"
        );
      });
      // Add mouse down event in all devices elements
      $('.device').on('mousedown', function () {
        this.selectedId = $(this).attr('deviceid');
      });
      // Add right click event in all devices elements
      $('.device').on('contextmenu', function () {
        indexWrk.removeDeviceId($(this).attr('deviceid'));
      });
      // Add double-click event in all devices elements
      $('.device').on('dblclick', function () {
        
      });
    }
  }
}
