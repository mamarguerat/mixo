class DeviceTypeLUT {
  constructor() {
    this._deviceInfo = [
    /* ----- Mixers ----- */
      { Type: "Mixer", ID: "x32c", Inputs: 16, Outputs: 8, Brand: "Behringer", FullName: "X32 Compact", accelerator: "CmdOrCtrl+M" },
    /* ----- Stage boxes ----- */
      { Type: "Stage Box", ID: "sd16", Inputs: 16, Outputs:  8, Brand: "Behringer", FullName: "SD16", accelerator: "CmdOrCtrl+Shift+M" },
      { Type: "Stage Box", ID: "sd8",  Inputs:  8, Outputs:  8, Brand: "Behringer", FullName: "SD8",  accelerator: "" },
    ];
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