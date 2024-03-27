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
      { Name: "Off", Color: "#000000", ID: "OFF" },
      { Name: "Red", Color: "#E72D2E", ID: "RD" },
      { Name: "Green", Color: "#35e72d", ID: "GN" },
      { Name: "Yellow", Color: "#FCF300", ID: "YE" },
      { Name: "Blue", Color: "#0060FF", ID: "BL" },
      { Name: "Magenta", Color: "#ED27AC", ID: "MG" },
      { Name: "Cyan", Color: "#2DE0E7", ID: "CY" },
      { Name: "White", Color: "#FFFFFF", ID: "WH" }
    ];
  }
}