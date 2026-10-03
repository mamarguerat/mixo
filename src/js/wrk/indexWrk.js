class IndexWrk {

  // MARK: Constructor
  constructor() {
    this.devices = [];
    this.links = [];
    this.id = 0;
  }

  // MARK: Functions
  /**
   * Add an empty device to the devices array
   * @param {String} deviceType 
   * @param {Number} x optional position
   * @param {Number} y optional position
   */
  addDevice(deviceType, x, y) {
    console.log(`[indexWrk] add device`);
    let device = newDevice(deviceType, this.id++);
    if (x !== undefined) {
      device.setPos(x, y);
    }
    this.devices.push(device);
    indexCtrl.drawCanvas(this.devices, this.links);
  }

  /**
   * Add a copy of a device (plain object, as serialized) without its links
   * @param {*} deviceData 
   * @param {Number} x 
   * @param {Number} y 
   */
  pasteDevice(deviceData, x, y) {
    console.log(`[indexWrk] paste device`);
    let device = constants.reconstructIndexWrk({ devices: [deviceData], links: [], id: 0 }).devices[0];
    device._id = this.id++;
    device.setPos(x, y);
    this.devices.push(device);
    indexCtrl.drawCanvas(this.devices, this.links);
  }

  /**
   * Reset a device to its defaults, keeping id, name, position and links
   * @param {Number} id 
   */
  resetDeviceId(id) {
    console.log(`[indexWrk] reset device with id ${id}`);
    let index = id2index(id, this.devices);
    let old = this.devices[index];
    let device = newDevice(old.getType(), old.getId());
    device.setName(old.getName());
    device.setPos(old.getPosX(), old.getPosY());
    this.devices[index] = device;
    indexCtrl.drawCanvas(this.devices, this.links);
  }

  /**
   * Remove all links of a device
   * @param {Number} id 
   */
  removeLinksId(id) {
    console.log(`[indexWrk] remove links of device with id ${id}`);
    this.links = this.links.filter(link =>
      Number(link.getFromDeviceId()) !== Number(id) && Number(link.getToDeviceId()) !== Number(id));
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
    this.removeDeviceIndex(id2index(id, this.devices));
    this.removeLinksId(id);
  }

  /**
   * Remove a device in the devices array from an index
   * @param {Number} index 
   */
  removeDeviceIndex(index) {
    this.devices.splice(index, 1);
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
  updateConnector(deviceID, connectorType, connectorNbr, name, color, icon, phaseInvert, colorInvert, phantomPower) {
    if (connectorType == "i") {
      console.log(`[indexWrk] id ${deviceID}, index ${id2index(deviceID, this.devices)}`);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setName(name);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setColor(color);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setIcon(icon);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setPhaseInvert(phaseInvert);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setColorInvert(colorInvert);
      this.devices[id2index(deviceID, this.devices)].inputs[connectorNbr - 1].setPhantomPower(phantomPower);
    }
    else {
      this.devices[id2index(deviceID, this.devices)].outputs[connectorNbr - 1].setName(name);
      this.devices[id2index(deviceID, this.devices)].outputs[connectorNbr - 1].setColor(color);
      this.devices[id2index(deviceID, this.devices)].outputs[connectorNbr - 1].setIcon(icon);
    }
  }

  /**
   * Update a channel of device
   * @param {Number} deviceID 
   * @param {String} channelType 
   * @param {String} channelIndex 
   * @param {*} connector 
   */
  updateChannel(deviceID, channelType, channelIndex, connectorDeviceId, connectorIndex, connectorSource, channelCnt) {
    if (channelType == "channel-input") {
      console.log(`[indexWrk] id ${deviceID}, index ${id2index(deviceID, this.devices)}`);
      this.devices[id2index(deviceID, this.devices)].channels[channelIndex].setDeviceId(connectorDeviceId);
      this.devices[id2index(deviceID, this.devices)].channels[channelIndex].setIO(connectorIndex);
      this.devices[id2index(deviceID, this.devices)].channels[channelIndex].setSource(connectorSource);
      this.devices[id2index(deviceID, this.devices)].channels[channelIndex].setChannelCnt(channelCnt);
    }
    else {
      console.error(`[indexWrk] invalid tab id ${channelType}`);
    }
  }

  /**
   * Update worker and canvas
   */
  update() {
    indexCtrl.drawCanvas(this.devices, this.links);
  }

  /**
   * Get all used connectors from a device
   * @param {Number} deviceID
   * @param {String} connectorType
   * @returns All assigned connectors in array of { deviceID, index }
   */
  getAllUsedConnectors(deviceID, connectorType) {
    let scannedDevices = [];
    this.recurseLevel = 0;
    this.previousChannels = 0;
    return this._getUsedConnectors(deviceID, connectorType, scannedDevices, "Local");
  }

  /**
   * Get Used connectors of device, and recurse to all connected devices
   * @param {Device} deviceID 
   * @param {String} connectorType 
   * @param {*} scannedDevices
   * @param {String} source
   * @returns The connectors that has been assigned
   */
  _getUsedConnectors(deviceID, connectorType, scannedDevices, source) {
    let usedConnectors = [];
    let previousChannels;
    let inputCnt = 0;
    if (this.recurseLevel <= 1)
    {
      this.previousChannels = 0;
    }
    previousChannels = this.previousChannels;
    this.recurseLevel++;
  
    console.log(`[indexWrk] getAllUsedConnectors(${deviceID}, ${connectorType})`);
    scannedDevices.push(deviceID);
  
    // Function
    let device = this.getDeviceFromId(deviceID);
    if (connectorType == 'i') {
      device.inputs.forEach((input, index, fullArray) => {
        if (input.getName() != "" || input.getColor() != "OFF" || input.getIcon() != "1") {
          inputCnt = index + previousChannels;
          this.previousChannels++;
          usedConnectors.push({ deviceID, index, source, inputCnt });
        }
      });
    }
    else {
      device.outputs.forEach((output, index, fullArray) => {
        if (output.getName() != "" || output.getColor() != "OFF" || output.getIcon() != "1") {
          inputCnt = index + previousChannels;
          this.previousChannels++;
          usedConnectors.push({ deviceID, index, source, inputCnt });
        }
      });
    }
  
    // Recurse condition
    let deviceLinks = this.links.filter((link) =>
      (link.getFromDeviceId() === deviceID) || (link.getToDeviceId() === deviceID)
    );
    deviceLinks.forEach((link, index, fullArray) => {
      let newSource = this.recurseLevel == 1 ? link.getToAes50() : source;
      console.log(`[indexWrk] Found link between ${link.getFromDeviceId()} and ${link.getToDeviceId()} with source ${newSource} and recurseLevel ${this.recurseLevel}`);
      if (link.getFromDeviceId() !== deviceID) {
        if (false == scannedDevices.includes(link.getFromDeviceId())) {
          usedConnectors = usedConnectors.concat(this._getUsedConnectors(link.getFromDeviceId(), connectorType, scannedDevices, newSource));
        }
      }
      else {
        if (false == scannedDevices.includes(link.getToDeviceId())) {
          usedConnectors = usedConnectors.concat(this._getUsedConnectors(link.getToDeviceId(), connectorType, scannedDevices, newSource));
        }
      }
    });
  
    this.recurseLevel--;
    return usedConnectors;
  }

  /**
   * Get a specific connector
   * @param {Number} deviceID 
   * @param {String} type 
   * @param {Number} index 
   * @returns The connector of type at index for deviceID
   */
  getConnector(deviceID, type, index) {
    console.log(`[indexWrk] Get connector ${type}${index} of device ${deviceID}`);
    let device = this.getDeviceFromId(deviceID);
    try {
      if (type == 'i') {
        return device.inputs[index];
      }
      else {
        return device.outputs[index];
      }
    }
    catch {
      return;
    }
  }

  /**
   * Copy connector properties (as serialized) onto a connector.
   * Outputs have no +48V or phase inversion.
   * @param {Number} deviceID 
   * @param {String} type 'i' or 'o'
   * @param {Number} index 0-based
   * @param {*} data 
   */
  setConnector(deviceID, type, index, data) {
    console.log(`[indexWrk] Set connector ${type}${index} of device ${deviceID}`);
    let connector = this.getConnector(deviceID, type, index);
    let fields = ['_name', '_color', '_colorInvert', '_icon'];
    if (type == 'i') {
      fields.push('_phaseInvert', '_pwr');
    }
    fields.forEach(field => connector[field] = data[field]);
  }

  /**
   * Move a channel from index to index
   * @param {Number} deviceID 
   * @param {String} channelType 
   * @param {Number} fromIndex 
   * @param {Number} toIndex 
   */
  moveChannel(deviceID, channelType, fromIndex, toIndex) {
    console.log(`[indexWrk] Move channel ${channelType} from ${fromIndex} to ${toIndex}`);
    this.devices[id2index(deviceID, this.devices)].moveChannel(channelType, fromIndex, toIndex);
  }
}

// MARK: Private funcitons
/*----- Private functions ---------------------------------------------------------------------------------------------------*/
/**
 * Increment the trailing number of a name, keeping zero padding and the 12 chars limit
 * ("Tom 1" -> "Tom 2", "Vox09" -> "Vox10"). Names without a number are unchanged.
 * @param {String} name 
 * @returns {String}
 */
function incrementName(name) {
  let match = name.match(/^(.*?)(\d+)$/);
  if (!match) {
    return name;
  }
  let number = String(Number(match[2]) + 1).padStart(match[2].length, '0');
  return match[1].slice(0, 12 - number.length) + number;
}

/**
 * Create an empty device of a type from the LUT
 * @param {String} deviceType 
 * @param {Number} id 
 * @returns {Device}
 */
function newDevice(deviceType, id) {
  let LUT = new DeviceTypeLUT();
  return new Device(deviceType, id, ...LUT.getIoCnt(deviceType), ...LUT.getChCnt(deviceType));
}

/**
 * Search an in an array and return the index (array[index].id)
 * @param {Number} id 
 * @param {*} array 
 * @returns The ID in the array
 */
function id2index(id, array) {
  return array.findIndex((element) => Number(element.getId()) === Number(id));
}