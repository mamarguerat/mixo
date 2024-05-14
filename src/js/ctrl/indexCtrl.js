const { ipcRenderer } = require("electron");

const constants = new Const();

class IndexCtrl {

  // MARK: Constructor
  constructor() {
    /* ----- IPC ----- */
    ipcRenderer.on('menu', (event, arg) => {
      this.menuClick(arg);
    })
    ipcRenderer.on('request-data-changes', (event, arg) => {
      this.requestDataChanges(arg);
    })
    /* ----- DOM Event Listeners ----- */
    window.addEventListener("mousemove", (e) => {
      this.mouseMove(e);
    })
    window.addEventListener("mouseup", (e) => {
      this.mouseUp(e);
    })
    $('#canvas').on('mousedown', '.AES50', (e) => {
      this.AES50Select(e);
    })
    $('#canvas').on('mousedown', '.deviceimg', (e) => {
      this.deviceSelect(e);
    })
    $('#canvas').on('contextmenu', '.deviceimg', (e) => {
      this.deleteDevice(e);
    });
    $('#canvas').on('dblclick', '.deviceimg', (e) => {
      this.openDeviceDetail(e);
    });
    $('#canvas').on('keyup', (e) => {
      this.saveText(e);
    })
    this.selectedElement = {};
  }

  // MARK: Event handling
  /**
   * Mouse up event handling
   * @param {Event} e 
   */
  mouseUp(e) {
    if (this.selectedElement.Type === "AES50") {
      let id = e.target.parentElement.getAttribute('deviceid');
      let Aes50Cible = e.target.getAttribute('aes50');
      $('#currentline').remove();
      if (null != Aes50Cible) {
        indexWrk.addLink(this.selectedElement.Id, this.selectedElement.Aes50Source, id, Aes50Cible);
      }
    }
    else if (this.selectedElement.Type === "Device") {
      console.log(`new x ${this.selectedElement.NewX} new y ${this.selectedElement.NewY}`)
      indexWrk.moveDeviceId(this.selectedElement.Id, this.selectedElement.NewX, this.selectedElement.NewY);
    }
    this.selectedElement = {};
  }

  /**
   * Mouse move event handling
   * @param {Event} e 
   */
  mouseMove(e) {
    // directly change DOM for selected element, save in Worker on mouseup
    if (this.selectedElement.Type === "AES50") {
      // AES50 selected
      $('#currentline').attr('d',
        'M' + (this.selectedElement.FromX + this.selectedElement.Xoffset) + ',' + this.selectedElement.FromY +
        ' C ' + (this.selectedElement.FromX + this.selectedElement.Xoffset) + ',' + (this.selectedElement.FromY - 80) +
        ' ' + (e.clientX + 0) + ',' + (e.clientY - 80) +
        ' ' + (e.clientX + 0) + ',' + e.clientY
      );
    }
    else if (this.selectedElement.Type === "Device") {
      // Device selected
      this.selectedElement.NewX = e.clientX - this.selectedElement.MouseX + this.selectedElement.Left;
      this.selectedElement.NewY = e.clientY - this.selectedElement.MouseY + this.selectedElement.Top;
      if (this.selectedElement.NewX < 0) {
        this.selectedElement.NewX = 0;
      }
      else {
        this.selectedElement.NewX = Math.round(this.selectedElement.NewX / 10) * 10;
      }
      if (this.selectedElement.NewY < 0) {
        this.selectedElement.NewY = 0;
      }
      else {
        this.selectedElement.NewY = Math.round(this.selectedElement.NewY / 10) * 10;
      }
      this.moveDevice(this.selectedElement.Id, this.selectedElement.NewX, this.selectedElement.NewY);
    }
  }

  deleteDevice(e) {
    let id = $(e.target).parent().attr('deviceid');
    indexWrk.removeDeviceId(id);
    this.selectedElement = {};
  }

  /**
   * Open window with device detail
   * @param {Event} e 
   */
  openDeviceDetail(e) {
    //TODO: Open new window
    let id = $(e.target).parent().attr('deviceid');
    console.log(indexWrk);
    ipcRenderer.send('window', { id: id, worker: indexWrk });
  }

  /**
   * Save name of device on key up
   * @param {Event} e 
   */
  saveText(e) {
    let id = $(e.target).parent().attr('deviceid');
    let value = $(e.target).val();
    indexWrk.saveNameId(id, value);
  }

  /**
   * AES50 button mouse down
   * @param {Event} e 
   */
  AES50Select(e) {
    let id = $(e.target).parent().attr('deviceid');
    let aes50 = $(e.target).attr('aes50');
    let x, y;
    let xoffset = aes50 == constants.AES50.A ? 58 : 78;
    [x, y] = indexWrk.getDevicePosId(id);
    this.selectedElement = {
      Type: "AES50",
      Id: id,
      Aes50Source: aes50,
      FromX: x,
      FromY: y,
      Xoffset: xoffset,
    }
    document.getElementById('lines').innerHTML +=
      "<path id='currentline' class='line' d='M" +
      (x + xoffset) + "," + y +
      " C " + (x + xoffset) + "," + (y - 80) +
      " " + (e.clientX + 0) + "," + (e.clientY - 80) +
      " " + (e.clientX + 0) + "," + e.clientY +
      "'/>";
  }

  /**
   * Device image mouse down
   * @param {Event} e 
   */
  deviceSelect(e) {
    console.log(e.target);
    let parent = $(e.target).parent();
    let x = e.clientX;
    let y = e.clientY;
    let top = parent.css('top').replace(/[^0-9\.]+/g, '') | 0;
    let left = parent.css('left').replace(/[^0-9\.]+/g, '') | 0;
    this.selectedElement = {
      Type: "Device",
      Id: parent.attr('deviceid'),
      Top: top,
      Left: left,
      NewX: left,
      NewY: top,
      MouseX: x,
      MouseY: y,
    };
  }

  // MARK: IPC events
  /**
   * Menu action received from IPC
   * @param {*} arg 
   */
  menuClick(arg) {
    console.log(`[indexCtrl] menu click ${arg.action}`);
    if (arg.action === 'add')
    {
      console.log(`[indexCtrl] add device`);
      indexWrk.addDevice(arg.type);
    }
  }

  /**
   * Data changes received from child windows IPC
   * @param {*} arg 
   */
  requestDataChanges(arg) {
    // TODO: Add IO parameters
  }

  // MARK: Functions
  /**
   * Refresh DOM
   * @param {Device[]} devices 
   * @param {Link[]} links 
   */
  drawCanvas(devices, links) {
    $('#canvas').empty();
    $('#canvas').append('<svg id="lines" class="lines"></svg>')
    if (devices.length > 0) {
      this.drawDevices(devices);
    }
    if (links.length > 0) {
      this.drawLines(links);
    }
    ipcRenderer.send('forward-to-childs', indexWrk);
  }

  /**
   * Add links to DOM
   * @param {links[]} links 
   */
  drawLines(links) {
    console.log(`[indexCtrl] draw lines`);
    $('#lines').empty();
    links.forEach(link => {
      let x1, y1, x2, y2;
      [x1, y1] = indexWrk.getDevicePosId(link.getFromDeviceId());
      x1 += link.getFromAes50() == constants.AES50.A ? 58 : 78;
      [x2, y2] = indexWrk.getDevicePosId(link.getToDeviceId());
      x2 += link.getToAes50() == constants.AES50.A ? 58 : 78;
      document.getElementById('lines').innerHTML +=
        "<path class='line' d='M" + x1 + "," + y1 +
        " C " + x1 + "," + (y1 - 80) +
        " " + x2 + "," + (y2 - 80) +
        " " + x2 + "," + y2 +
        "' stroke='black' fill='transparent'></path>";
    });
  }

  /**
   * Add devices to DOM
   * @param {Device[]} devices 
   */
  drawDevices(devices) {
    console.log(`[indexCtrl] draw devices`);
    devices.forEach(device => {
      $("#canvas").append(
        "<div deviceid='" + device.getId() +
        "' class='device " + device.getType() +
        "' style='top: " + device.getPosY() +
        "px; left: " + device.getPosX() + "px;'>" +
        "<div class='AES50' aes50='A' style='left: 50px; top: 0px;'>A</div>" +
        "<div class='AES50' aes50='B' style='left: 70px; top: 0px;'>B</div>" +
        "<div class='deviceimg'><object draggable='false' data='" + path.join(constants.imagesPath, device.getType() + ".svg") +
        "'></object></div><input type='text' value='" + device.getName() + "'></div>"
      );
    });
  }

  /**
   * Move a device in DOM and save new position
   * @param {Number} id 
   * @param {Number} x 
   * @param {Number} y 
   */
  moveDevice(id, x, y) {
    let $element = $('*[deviceid="' + id + '"]');
    $element.css('top', y + 'px');
    $element.css('left', x + 'px');
    indexWrk.moveDeviceId(id, x, y);
  }
}
