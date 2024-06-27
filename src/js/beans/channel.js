class Channel {
  constructor(id) {
    this._id = id;
    this._deviceId = "";
    this._IO = "";
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
}
