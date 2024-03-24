const Constants = require('./const.js');

class Link {
  constructor(dev1, aes50_1, dev2, aes50_2) {
    this.device1 = dev1;
    this.device2 = dev2;
    this.aes50_1 = aes50_1;
    this.aes50_2 = aes50_2;
  }

  show(devices) {
    let x1offset = this.aes50_1 == Constants.AES50.A ? 58 : 78;
    let x2offset = this.aes50_2 == Constants.AES50.A ? 58 : 78;
    //return "<line class='line' x1='" + (devices[this.device1].x + 58) + "' y1='" + devices[this.device1].y + "' x2='" + (devices[this.device2].x + 58) + "' y2='" + devices[this.device2].y + "' stroke='black' fill='transparent'/>";
    return "<path class='line' d='M" + (devices[Constants.id2index(this.device1, devices)].x + x1offset) + "," + devices[Constants.id2index(this.device1, devices)].y +
    " C " + (devices[Constants.id2index(this.device1, devices)].x + x1offset) + "," + (devices[Constants.id2index(this.device1, devices)].y - 80) +
    " " + (devices[Constants.id2index(this.device2, devices)].x + x2offset) + "," + (devices[Constants.id2index(this.device2, devices)].y - 80) +
    " " + (devices[Constants.id2index(this.device2, devices)].x + x2offset) + "," + devices[Constants.id2index(this.device2, devices)].y +
    "' stroke='black' fill='transparent'/>";
  }
}

module.exports = Link
