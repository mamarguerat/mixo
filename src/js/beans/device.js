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
      this.channels.push(new Channel(i));
    }
    // Create array of mixbuses
    for (let i = 0; i < totalMixbuses; i++) {
      this.mixbuses.push(new Channel(i));
    }
    // Create array of matrix
    for (let i = 0; i < totalMatrix; i++) {
      this.matrix.push(new Channel(i));
    }
    // Create array of stereo
    for (let i = 0; i < totalStereo; i++) {
      this.stereo.push(new Channel(i));
    }
    // Create array of dca
    for (let i = 0; i < totalDca; i++) {
      this.dca.push(new Channel(i));
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
}
