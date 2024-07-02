class Device {
  constructor(type, id, totalInput, totalOutput, totalChannels, totalMixbuses, totalMatrix, totalStereo, totalDca) {
    this.x = 10;
    this.y = 10;
    this._type = type;
    this._id = id;
    this.name = type;
    this.inputs = [];
    this.outputs = [];
    this.channels = [];
    this.mixbuses = [];
    this.matrix = [];
    this.stereo = [];
    this.dca = [];

    // Create array of inputs
    for (let i = 0; i < totalInput; i++) {
      let connector = new Connector();
      connector.setPhantomPower(false);
      connector.setPhaseInvert(false);
      this.inputs.push(connector);
    }
    // Create array of outputs
    for (let i = 0; i < totalOutput; i++) {
      this.outputs.push(new Connector());
    }
    // Create array of channels
    for (let i = 0; i < totalChannels; i++) {
      this.channels.push(new Channel());
    }
    // Create array of mixbuses
    for (let i = 0; i < totalMixbuses; i++) {
      this.mixbuses.push(new Channel());
    }
    // Create array of matrix
    for (let i = 0; i < totalMatrix; i++) {
      this.matrix.push(new Channel());
    }
    // Create array of stereo
    for (let i = 0; i < totalStereo; i++) {
      this.stereo.push(new Channel());
    }
    // Create array of dca
    for (let i = 0; i < totalDca; i++) {
      this.dca.push(new Channel());
    }
  }

  // MARK: RO properties
  /*----- Read only properties ----------------------------------------------------------------------------------------------*/

  getType() {
    return this._type;
  }

  getId() {
    return this._id;
  }

  // MARK: RW properties
  /*----- Read/Write properties ---------------------------------------------------------------------------------------------*/

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  getPos() {
    return [this.x, this.y];
  }

  getPosX() {
    return this.x;
  }

  getPosY() {
    return this.y;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  // MARK: Public functions
  moveChannel(channelType, fromIndex, toIndex) {
    if (channelType == "input") {
      this.channels = array_move(this.channels, fromIndex, toIndex);
    }
    else if (channelType == "mixbus") {
      this.mixbuses = array_move(this.mixbuses, fromIndex, toIndex);
    }
    else if (channelType == "matrix") {
      this.matrix = array_move(this.matrix, fromIndex, toIndex);
    }
    else if (channelType == "stereo") {
      this.stereo = array_move(this.stereo, fromIndex, toIndex);
    }
    else if (channelType == "dca") {
      this.dca = array_move(this.dca, fromIndex, toIndex);
    }
  }
}

// MARK: Private funcitons
/*----- Private functions ---------------------------------------------------------------------------------------------------*/
function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};
