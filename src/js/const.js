const path = require('path');
const publicPath = process.env.NODE_ENV === 'development'
  ? '../public'
  : path.join(process.resourcesPath, 'public');

class Const {
  constructor() {
    this.imagesPath = path.join(publicPath, "assets", "images");
    this.iconsPath = path.join(publicPath, "assets", "icons", "svg");
    this.AES50 = {
      A: "A",
      B: "B"
    };
    this.icons = [
      "No icon", "Kick Back", "Kick Front", "Snare Top", "Snare Bottom", "High Tom", "Mid Tom", "Floor Tom", "Hi-Hat", "Ride",
      "Drum Kit", "Cowbell", "Bongos", "Congas", "Tambourine", "Vibraphone", "Electric Bass", "Acoustic Bass", "Contrabass", "Les Paul Guitar",
      "Ibanez Guitar", "Washburn Guitar", "Acoustic Guitar", "Bass Amp", "Guitar Amp", "Amp Cabinet", "Piano", "Organ", "Harpsichord", "Keyboard",
      "Synthesizer 1", "Synthesizer 2", "Synthesizer 3", "Keytar", "Trumpet", "Trombone", "Saxophone", "Clarinet", "Violin", "Cello",
      "Male Vocal", "Female Vocal", "Choir", "Hand Sign", "Talk A", "Talk B", "Large Diaphragm Mic", "Condenser Mic Left", "Condenser Mic Right", "Handheld Mic",
      "Wireless Mic", "Podium Mic", "Headset Mic", "XLR Jack", "TRS Plug", "TRS Plug Left", "TRS Plug Right", "RCA Plug Left", "RCA Plug Right", "Reel to Reel",
      "FX", "Computer", "Monitor Wedge", "Left Speaker", "Right Speaker", "Speaker Array", "Speaker on a Pole", "Amp Rack", "Controls", "Fader",
      "MixBus", "Matrix", "Routing", "Smiley"
    ];
    this.colors = [
      { Name: "Off",      ColorBack: "#000000", ColorFront: "#FFFFFF", ID: "OFF" },
      { Name: "Red",      ColorBack: "#E72D2E", ColorFront: "#000000", ID: "RD" },
      { Name: "Green",    ColorBack: "#35E72D", ColorFront: "#000000", ID: "GN" },
      { Name: "Yellow",   ColorBack: "#FCF300", ColorFront: "#000000", ID: "YE" },
      { Name: "Blue",     ColorBack: "#0060FF", ColorFront: "#FFFFFF", ID: "BL" },
      { Name: "Magenta",  ColorBack: "#ED27AC", ColorFront: "#000000", ID: "MG" },
      { Name: "Cyan",     ColorBack: "#2DE0E7", ColorFront: "#000000", ID: "CY" },
      { Name: "White",    ColorBack: "#FFFFFF", ColorFront: "#000000", ID: "WH" }
    ];
  }

  getColorCode(colorID) {
    var color = this.colors.find(color => {
      return color.ID == colorID;
    })
    return { Back: color.ColorBack, Front: color.ColorFront };
  }

  reconstructIndexWrk(wrk) {
    var ret = new IndexWrk();
    wrk.devices.forEach(device => {
      ret.devices.push(new Device(device._type, device._id, 0, 0));
      var devIdx = ret.devices.length - 1;
      ret.devices[devIdx].x = device.x;
      ret.devices[devIdx].y = device.y;
      ret.devices[devIdx].name = device.name;
      device.inputs.forEach(input => {
        ret.devices[devIdx].inputs.push(new Connector());
        var connIdx = ret.devices[devIdx].inputs.length - 1;
        ret.devices[devIdx].inputs[connIdx]._name = input._name;
        ret.devices[devIdx].inputs[connIdx]._color = input._color;
        ret.devices[devIdx].inputs[connIdx]._colorInvert = input._colorInvert;
        ret.devices[devIdx].inputs[connIdx]._icon = input._icon;
      });
      device.outputs.forEach(output => {
        ret.devices[devIdx].outputs.push(new Connector());
        var connIdx = ret.devices[devIdx].outputs.length - 1;
        ret.devices[devIdx].outputs[connIdx]._name = output._name;
        ret.devices[devIdx].outputs[connIdx]._color = output._color;
        ret.devices[devIdx].outputs[connIdx]._colorInvert = output._colorInvert;
        ret.devices[devIdx].outputs[connIdx]._icon = output._icon;
      });
    });
    wrk.links.forEach(link => {
      ret.links.push(new link(link._device1, link._device2, link._aes50_1, link._aes50_2))
    })
    ret.devTypeLUT = new DeviceTypeLUT();
    ret.id = wrk.id;
    return ret;
  }
}