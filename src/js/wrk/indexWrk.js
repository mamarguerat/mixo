class IndexWrk {

  // MARK: Constructor
  constructor() {
    this.devices = [];
    this.links = [];
    this.devTypeLUT = new DeviceTypeLUT();
    this.id = 0;
  }

  // MARK: Functions
  /**
   * Add an empty device to the devices array
   * @param {String} deviceType 
   */
  addDevice(deviceType) {
    let inputCnt, outputCnt;
    console.log(`[indexWrk] add device`);
    [inputCnt, outputCnt] = this.devTypeLUT.getIoCnt(deviceType);
    this.devices.push(new Device(deviceType, this.id++, inputCnt, outputCnt));
    indexCtrl.drawCanvas(this.devices, this.links);
  }

  /**
   * Add a link in the link array
   * @param {Number} fromID 
   * @param {String} fromAES 
   * @param {Number} toID 
   * @param {String} toAES 
   */
  addLink(fromID, fromAES, toID, toAES) {
    this.deleteConnectedAt(fromID, fromAES, toID, toAES);
    if (fromID != toID && false == this.checkIfExists(fromID, fromAES, toID, toAES)) {
      console.log(`[indexWrk] add link from id ${fromID} ${fromAES} to id ${toID} ${toAES}`);
      this.links.push(new Link(fromID, fromAES, toID, toAES));
    }
    indexCtrl.drawCanvas(this.devices, this.links);
  }

  /**
   * Delete link already created in the selected AES ports
   * @param {Number} fromID 
   * @param {String} fromAES 
   * @param {Number} toID 
   * @param {String} toAES 
   */
  deleteConnectedAt(fromID, fromAES, toID, toAES) {
    // Do it twice to delete all 2 possible links
    for (let idx = 0; idx < 2; idx++) {
      this.links.forEach((link, index, fullArray) => {
        // if link already on aes50
        if ((fromID == link.getFromDeviceId() && fromAES == link.getFromAes50()) ||
            (fromID == link.getToDeviceId() && fromAES == link.getToAes50()) ||
            (toID == link.getFromDeviceId() && toAES == link.getFromAes50()) ||
            (toID == link.getToDeviceId() && toAES == link.getToAes50())) {
          fullArray.splice(index, 1);
        }
      });
    }
  }

  /**
   * Remove a device in the devices array from an ID
   * @param {Number} id 
   */
  removeDeviceId(id) {
    console.log(`[indexWrk] remove device with id ${id}`);
    this.deleteConnectedAt(id, 'A', id, 'B');
    this.removeDeviceIndex(id2index(id, this.devices));
    indexCtrl.drawCanvas(this.devices, this.links);
  }

  /**
   * Remove a device in the devices array from an index
   * @param {Number} index 
   */
  removeDeviceIndex(index) {
    this.devices.splice(index, 1);
    // TODO: remove links of this device
  }

  /**
   * Move a device in the devices array fom an id
   * @param {Number} id 
   * @param {Number} x 
   * @param {Number} y 
   */
  moveDeviceId(id, x, y) {
    console.log(`[indexWrk] move device with id ${id} to position x=${x} y=${y}`);
    this.moveDeviceIndex(id2index(id, this.devices), x, y);
    indexCtrl.drawLines(this.links);
  }

  /**
   * Move a device in the devices array fom an index
   * @param {Number} id 
   * @param {Number} x 
   * @param {Number} y 
   */
  moveDeviceIndex(index, x, y) {
    this.devices[index].setPos(x, y);
  }

  saveNameId(id, name) {
    console.log(`[indexWrk] save new name ${name}`);
    this.saveNameIndex(id2index(id, this.devices), name);
  }

  saveNameIndex(index, name) {
    this.devices[index].setName(name);
  }

  getDeviceFromId(id) {
    return this.getDeviceFromIndex(id2index(id, this.devices));
  }

  getDeviceFromIndex(index) {
    return this.devices[index];
  }

  /**
   * Get a device position in the devices array fom an id
   * @param {Number} id 
   */
  getDevicePosId(id) {
    return this.getDevicePosIndex(id2index(id, this.devices));
  }

  /**
   * Get a device position in the devices array fom an index
   * @param {Number} id 
   */

  getDevicePosIndex(index) {
    return this.devices[index].getPos();
  }

  /**
   * Check if the link to create already exists on the database
   * @param {Number} fromID 
   * @param {AES50} fromAES 
   * @param {Number} toID 
   * @param {AES50} toAES 
   * @returns 
   */
  checkIfExists(fromID, fromAES, toID, toAES) {
    let existingLinks = this.links.filter((link) =>
      (link.getFromDeviceId() === fromID) && (link.getToDeviceId() === toID) &&
      (link.getFromAes50() === fromAES) && (link.getToAes50() === toAES)
    );
    if (existingLinks.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Update a connector of device
   * @param {Number} deviceID 
   * @param {String} connectorType 
   * @param {String} connectorNbr 
   * @param {String} name 
   * @param {String} color 
   * @param {String} icon 
   * @param {Boolean} phaseInvert 
   * @param {Boolean} colorInvert 
   */
  updateConnector(deviceID, connectorType, connectorNbr, name, color, icon, phaseInvert, colorInvert) {
    if (connectorType == "i") {
      console.log(`[indexWrk] id ${deviceID}, index ${id2index(deviceID, this.devices)}`);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setName(name);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setColor(color);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setIcon(icon);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setPhaseInvert(phaseInvert);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setColorInvert(colorInvert);
    }
    else {
      this.devices[id2index(deviceID, this.devices)].outputs[connectorNbr - 1].setName(name);
      this.devices[id2index(deviceID, this.devices)].outputs[connectorNbr - 1].setColor(color);
      this.devices[id2index(deviceID, this.devices)].outputs[connectorNbr - 1].setIcon(icon);
      this.devices[id2index(deviceID, this.devices)].outputs[connectorNbr - 1].setPhaseInvert(phaseInvert);
      this.devices[id2index(deviceID, this.devices)].outputs[connectorNbr - 1].setColorInvert(colorInvert);
    }
  }

  /**
   * Update worker and canvas
   */
  update() {
    indexCtrl.drawCanvas(this.devices, this.links);
  }
}

// MARK: Private funcitons
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