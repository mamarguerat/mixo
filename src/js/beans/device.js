class Device {
  constructor(type, id, totalInput, totalOutput) {
    this.x = 10;
    this.y = 10;
    this._type = type;
    this._id = id;
    this.name = type;
    this.inputs = [];
    this.outputs = [];

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
