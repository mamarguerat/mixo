class Channel {
  constructor() {
    this._deviceId = "";
    this._IO = "";
    this._source = "";
    this._channelCnt = "";
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

  getChannelCnt() {
    return this._channelCnt;
  }

  setChannelCnt(channelCnt) {
    this._channelCnt = channelCnt;
  }
}
