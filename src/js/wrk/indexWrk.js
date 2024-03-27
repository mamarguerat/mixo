class IndexWrk {
  constructor() {
    this.devices = [];
    this.links = [];
    this.devTypeLUT = new DeviceTypeLUT();
    this.id = 0;
  }

  /**
   * Add an empty device to the devices array
   * @param {String} deviceType 
   */
  addDevice(deviceType) {
    let inputCnt, outputCnt;
    console.log("[indexWrk] add device");
    [inputCnt, outputCnt] = this.devTypeLUT.getIoCnt(deviceType);
    this.devices.push(new Device(deviceType, this.id++, inputCnt, outputCnt));
    indexCtrl.drawDevices(this.devices);
  }

  /**
   * Remove a device in the devices array from an ID
   * @param {Number} id 
   */
  removeDeviceId(id) {
    console.log("[indexWrk] remove device with id " + id);
    this.removeDeviceIndex(id2index(id, this.devices));
    indexCtrl.drawDevices(this.devices);
  }

  /**
   * Remove a device in the devices array from an index
   * @param {Number} index 
   */
  removeDeviceIndex(index) {
    this.devices.splice(index, 1);
    // TODO: remove links of this device
  }
}

/*----- Private functions ---------------------------------------------------------------------------------------------------*/
/**
 * Search an in an array and return the index (array[index].id)
 * @param {Number} id 
 * @param {*} array 
 * @returns The ID in the array
 */
function id2index(id, array) {
  return array.findIndex((element) => Number(element.getId()) === Number(id));
}
