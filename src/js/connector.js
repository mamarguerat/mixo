class Connector {
    constructor(device, port, input, name, color, colorInvert, icon, pwr, phaseInvert) {
        this.device = device;
        this.port = port;
        this.input = input;
        this.name = name.slice(0, 12);
        this.color = color;
        this.colorInvert = colorInvert;
        this.icon = icon;
        this.pwr = pwr;
        this.phaseInvert = phaseInvert;
    }

    getColor() {
        return this.color + this.colorInvert ? "i" : "";
    }
}

module.exports = Connector