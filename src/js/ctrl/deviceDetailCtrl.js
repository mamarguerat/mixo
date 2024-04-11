const { ipcRenderer } = require("electron");

const constants = new Const();
class DeviceDetailCtrl {

  // MARK: Constructor
  constructor() {
    ipcRenderer.on('ready', (event, arg) => {
      console.log(`[deviceDetailCtrl] window ready, load device ${arg.id}`);
      this.initialize(arg);
    });
  }

  // MARK: Event handling
  
  // MARK: IPC events
  initialize(arg) {
    deviceDetailWrk = this.reconstructObject(arg.worker);
    console.log(deviceDetailWrk);
    this.deviceID = arg.id;
    this.drawCanvas(deviceDetailWrk.getDeviceFromId(this.deviceID));
  }

  // MARK: Functions
  reconstructObject(worker) {
    worker.addDevice = deviceDetailWrk.addDevice;
    worker.addLink = deviceDetailWrk.addLink;
    worker.getDeviceFromId = deviceDetailWrk.getDeviceFromId;
    worker.getDeviceFromIndex = deviceDetailWrk.getDeviceFromIndex;

    return worker;
  }

  drawCanvas(device) {
    $('#canvas').empty();
    $('#canvas').append(
      "<div id='device' class='device detail " + device.getName +
      "' style='top: 0px; left: 0px;'>" +
      "<object id='svg' class='detail' draggable='false' data='" + path.join(constants.imagesPath, device.getType() + ".svg") +
      "' type='image/svg+xml'></div>"
    )
  }
}