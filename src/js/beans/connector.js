class Connector {
  constructor() {
    this._name = "";
    this._color = "OFF";
    this._colorInvert = false;
    this._icon = "01";
  }

  // MARK: RW properties
  /*----- Read/Write properties ---------------------------------------------------------------------------------------------*/

  setName(name) {
    this._name = name.slice(0, 12);
  }

  getName() {
    return this._name;
  }

  setColor(color) {
    this._color = color;
  }

  getColor(color) {
    this._color = color;
  }

  setColorInvert(colorInvert) {
    this._colorInvert = colorInvert;
  }

  getColorInvert() {
    return this._colorInvert;
  }

  setColor(color, invert) {
    this._color = color;
    this._colorInvert = invert;
  }

  getColorText() {
    return this._color + this._colorInvert ? "i" : "";
  }

  setPhantomPower(pwr) {
    this._pwr = pwr;
  }

  getPhantomPower() {
    return this._pwr;
  }

  setPhaseInvert(phaseInvert) {
    this._phaseInvert = phaseInvert;
  }

  getPhaseInvert() {
    return this._phaseInvert;
  }
}
