class Link {
  constructor(dev1, aes50_1, dev2, aes50_2) {
    this._device1 = dev1;
    this._device2 = dev2;
    this._aes50_1 = aes50_1;
    this._aes50_2 = aes50_2;
  }

  // MARK: RO properties
  /*----- Read only properties ----------------------------------------------------------------------------------------------*/
  getFromDeviceId() {
    return this._device1;
  }

  getToDeviceId() {
    return this._device2;
  }

  getFromAes50() {
    return this._aes50_1;
  }

  getToAes50() {
    return this._aes50_2;
  }
}
