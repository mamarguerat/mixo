/**
 * Routing documentation as printable HTML (layout in styles/report.css).
 * Needs Const, DeviceTypeLUT and a worker rebuilt with Const.reconstructIndexWrk.
 * @param {IndexWrk} wrk
 * @param {String} title project name
 * @param {String} date
 * @returns {String} HTML of the report body
 */
function renderReport(wrk, title, date) {
  const constants = new Const();
  const LUT = new DeviceTypeLUT();
  const esc = (text) => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const isUsed = (connector) => connector.getName() != "" || connector.getColor() != "OFF" || connector.getIcon() != "1";
  const deviceName = (id) => { let device = wrk.getDeviceFromId(id); return device ? device.getName() : "?"; };
  const fullName = (type) => { let info = LUT._deviceInfo.find(device => device.ID === type); return info ? info.Brand + " " + info.FullName : type; };

  const chip = (connector) => {
    let colors = constants.getColorCode(connector.getColor());
    if (connector.getColorInvert()) {
      colors = { Back: colors.Front, Front: colors.Back };
    }
    return "<span class='chip' style='background:" + colors.Back + ";color:" + colors.Front + "'>" +
      "<img src='" + esc(path.join(constants.iconsPath, connector.getIcon() + ".svg")) + "' alt=''>" +
      esc(connector.getName()) + "</span>";
  };

  const table = (headers, rows, empty) => rows.length == 0 ? "<p class='empty'>" + empty + "</p>" :
    "<table><thead><tr>" + headers.map(h => "<th>" + h + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map(row => "<tr>" + row.map(cell => "<td>" + cell + "</td>").join("") + "</tr>").join("") +
    "</tbody></table>";

  const connectorRows = (connectors, withFlags) => connectors
    .map((connector, index) => ({ connector, index }))
    .filter(item => isUsed(item.connector))
    .map(item => [item.index + 1, chip(item.connector)].concat(withFlags ? [
      item.connector.getPhantomPower() ? "+48V" : "",
      item.connector.getPhaseInvert() ? "Ø" : "",
    ] : []));

  let html = "";

  // Cover
  html += "<section class='cover'><h1>" + esc(title) + "</h1><p class='date'>" + esc(date) + "</p>" +
    table(["Device", "Model", "Inputs", "Outputs"], wrk.devices.map(device => [
      esc(device.getName()), esc(fullName(device.getType())), device.inputs.length, device.outputs.length
    ]), "No device") + "</section>";

  // Physical connections
  html += "<section><h2>Physical connections</h2>" +
    table(["From", "Port", "To", "Port"], wrk.links.map(link => [
      esc(deviceName(link.getFromDeviceId())), "AES50 " + link.getFromAes50(),
      esc(deviceName(link.getToDeviceId())), "AES50 " + link.getToAes50()
    ]), "No AES50 connection") + "</section>";

  // Per device patch lists
  wrk.devices.forEach(device => {
    html += "<section><h2>" + esc(device.getName()) + " <small>" + esc(fullName(device.getType())) + "</small></h2>" +
      "<h3>Inputs</h3>" + table(["#", "Name", "Phantom", "Phase"], connectorRows(device.inputs, true), "No input used") +
      "<h3>Outputs</h3>" + table(["#", "Name"], connectorRows(device.outputs, false), "No output used") +
      "</section>";
  });

  // Per mixer channel lists
  wrk.devices.filter(device => device.channels.length > 0).forEach(device => {
    let rows = device.channels.map((channel, index) => {
      let connector = channel.getIO() === "" ? undefined : wrk.getConnector(channel.getDeviceId(), 'i', channel.getIO());
      return connector === undefined ? [index + 1, "<span class='empty'>—</span>", "", ""] : [
        index + 1, chip(connector), esc(channel.getSource() + channel.getChannelCnt()),
        esc(deviceName(channel.getDeviceId())) + " in " + (Number(channel.getIO()) + 1)
      ];
    });
    html += "<section><h2>" + esc(device.getName()) + " — Input channels</h2>" +
      table(["Ch", "Name", "Source", "Device input"], rows, "") + "</section>";
  });

  return html;
}
