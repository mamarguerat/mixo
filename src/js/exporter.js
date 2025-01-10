class Exporter {
  constructor() {
  }

  sncBuilder(arg) {
    let scn = "";
    let mixers = [];

    console.log(arg)

    this.indexWrk = arg;

    indexWrk.devices.forEach(device => {
      if (device._type === 'x32c') {
        mixers.push(device);
      }
    });

    console.log(mixers);

    mixers.forEach(mixer => {
      mixer.channels.forEach((channel, index, fullArray) => {
        scn += this.addChannel(channel, index + 1);
      });
    });

    console.log(scn);
    return scn;
  }

  addChannel(channel, index) {
    console.log(`${channel._deviceId} ${channel._IO} ${channel._source}`);
    let stringChannel = "";
    let formatIndex = String(index).padStart(2, '0');
    if (channel._deviceId === "" || channel._IO === "") {
      return stringChannel;
    }
    let io = this.indexWrk.getConnector(channel._deviceId, 'i', channel._IO);
    stringChannel += `/ch/${formatIndex}/config "${io.getName()}" ${io.getIcon()} ${io.getColorText()} 0\n`;  // todo: add source
    stringChannel += `/ch/${formatIndex}/delay OFF 0.3\n`;
    stringChannel += `/ch/${formatIndex}/preamp +0.0 ${io._phaseInvert ? "ON" : "OFF"} ${io._pwr ? "ON" : "OFF"} 24 101\n`;
    return stringChannel;
  }
}