class DeviceTypeLUT {
  constructor() {
    this._deviceInfo = [
    /* ----- Mixers ----- */
      { Type: "Mixer", ID: "x32c", Inputs: 16, Outputs: 8, Channels: 32, Mixbuses: 16, Matrix: 6, Stereo: 1, Dca: 8, Brand: "Behringer", FullName: "X32 Compact", accelerator: "CmdOrCtrl+M" },
      { Type: "Mixer", ID: "debug", Inputs: 8, Outputs: 8, Channels: 8, Mixbuses: 8, Matrix: 8, Stereo: 8, Dca: 8, Brand: "Debug", FullName: "Debug console", accelerator: "CmdOrCtrl+D" },
    /* ----- Stage boxes ----- */
      { Type: "Stage Box", ID: "sd16", Inputs: 16, Outputs:  8, Brand: "Behringer", FullName: "SD16", accelerator: "CmdOrCtrl+Shift+M" },
      { Type: "Stage Box", ID: "sd8",  Inputs:  8, Outputs:  8, Brand: "Behringer", FullName: "SD8",  accelerator: "" },
    ];
  }

  getTypeFromId(id) {
    let type = this._deviceInfo.filter((device) => (device.ID === id))[0].Type;
    console.log(`[deviceTypeLUT] Device id ${id} is a ${type}`);
    return type;
  }

  getInputsCnt(type) {
    let inputCnt = this._deviceInfo.filter((device) => (device.ID === type))[0].Inputs;
    console.log(`[deviceTypeLUT] Input Count for ${type} is ${inputCnt}`);
    return inputCnt;
  }
  
  getOutputsCnt(type) {
    let outputCnt = this._deviceInfo.filter((device) => (device.ID === type))[0].Outputs;
    console.log(`[deviceTypeLUT] Output Count for ${type} is ${outputCnt}`);
    return outputCnt;
  }

  getIoCnt(type) {
    return [this.getInputsCnt(type), this.getOutputsCnt(type)];
  }

  getChannelsCnt(type) {
    let channelsCnt;
    try {
      channelsCnt = this._deviceInfo.filter((device) => (device.ID === type))[0].Channels;
    }
    catch {
      channelsCnt = 0;
    }
    console.log(`[deviceTypeLUT] Channels Count for ${type} is ${channelsCnt}`);
    return channelsCnt;
  }

  getMixbusCnt(type) {
    let mixbusCnt;
    try {
      mixbusCnt = this._deviceInfo.filter((device) => (device.ID === type))[0].Mixbuses;
    }
    catch {
      mixbusCnt = 0;
    }
    console.log(`[deviceTypeLUT] Mixbus Count for ${type} is ${mixbusCnt}`);
    return mixbusCnt;
  }

  getMatrixCnt(type) {
    let matrixCnt;
    try {
      matrixCnt = this._deviceInfo.filter((device) => (device.ID === type))[0].Matrix;
    }
    catch {
      matrixCnt = 0;
    }
    console.log(`[deviceTypeLUT] Matrix Count for ${type} is ${matrixCnt}`);
    return matrixCnt;
  }

  getStereoCnt(type) {
    let stereoCnt;
    try {
      stereoCnt = this._deviceInfo.filter((device) => (device.ID === type))[0].Stereo;
    }
    catch {
      stereoCnt = 0;
    }
    console.log(`[deviceTypeLUT] Stereo Count for ${type} is ${stereoCnt}`);
    return stereoCnt;
  }

  getDcaCnt(type) {
    let dcaCnt;
    try {
      dcaCnt = this._deviceInfo.filter((device) => (device.ID === type))[0].Dca;
    }
    catch {
      dcaCnt = 0;
    }
    console.log(`[deviceTypeLUT] DCA Count for ${type} is ${dcaCnt}`);
    return dcaCnt;
  }

  getChCnt(type) {
    return [
      this.getChannelsCnt(type),
      this.getMixbusCnt(type),
      this.getMatrixCnt(type),
      this.getStereoCnt(type),
      this.getDcaCnt(type)
    ]
  }

  getBrands() {
    return [...new Set(this._deviceInfo.map(item => item.Brand))];
  }

  getBrandMixers(brand) {
    return this._deviceInfo.filter((device) => 
      (device.Type === "Mixer") && (device.Brand === brand)
    );
  }

  getBrandStageBoxes(brand) {
    return this._deviceInfo.filter((device) => 
      (device.Type === "Stage Box") && (device.Brand === brand)
    );
  }
}

/*----- Private functions ---------------------------------------------------------------------------------------------------*/


module.exports = DeviceTypeLUT;