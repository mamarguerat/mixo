class Channel {
  constructor(id) {
    this._id = id;
    this._deviceId = "";
    this._IO = "";
    this._source = "";
  }

  // MARK: RW properties
  /*----- Read/Write properties ---------------------------------------------------------------------------------------------*/
  getDeviceId() {
    return this._deviceId;
  }

  setDeviceId(id) {
    this._deviceId = id;
  }

  getIO() {
    return this._IO;
  }

  setIO(io) {
    this._IO = io;
  }

  getSource() {
    return this._source;
  }

  setSource(source) {
    this._source = source;
  }
}
