class io {
    constructor(device, port, input, name, color, colorInvert, icon, phaseInvert) {
        this.device = device;
        this.port = port;
        this.input = input;
        this.name = name.slice(0, 12);
        this.color = color;
        this.colorInvert = colorInvert;
        this.icon = icon;
        this.phaseInvert = phaseInvert;
    }

    getColor() {
        return this.color + this.colorInvert ? "i" : "";
    }
}