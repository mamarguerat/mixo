const path = require('path');
const Constants = require('./const.js');

class Device {
  constructor(x, y, type, id, name) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.id = id;
    this.name = name;
  }

  show() {
    return "<div id='" + this.id +
      "' class='device " + this.type +
      "' style='top: " + this.y +
      "px; left: " + this.x + "px;'>" +
      "<div class='AES50 A' style='left: 50px; top: 0px;'>A</div>" +
      "<div class='AES50 B' style='left: 70px; top: 0px;'>B</div>" +
      "<img draggable='false' src='" + path.join(Constants.imagesPath, this.type + ".svg") +
      "'><input type='text' value='" + this.name + "'></div>";
  }

  move(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  delete(links) {
    let finished = false;
    do {
      finished = false
      links.forEach((link, index, fullArray) => {
        // if link on the device to delete
        if ((this.id == link.device1) || (this.id == link.device2)) {
          finished = true;
          links.splice(index, 1); // changes the array length, act as break in loop
        }
      });
    }
    while (finished)
  }
}

module.exports = Device;