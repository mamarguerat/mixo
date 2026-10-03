// Run: node test/report.test.js [preview.html]
// Renders doc/demo.mixo_prj; with a path, also writes a preview to open in a browser.
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

process.env.NODE_ENV = 'development';
const root = path.join(__dirname, '..');
const ctx = vm.createContext({ require, process, console: { log() {}, error: console.error }, module: {} });
['const.js', 'beans/device.js', 'beans/link.js', 'beans/connector.js', 'beans/channel.js', 'beans/deviceTypeLUT.js', 'wrk/indexWrk.js', 'report.js']
  .forEach(f => vm.runInContext(fs.readFileSync(path.join(root, 'src', 'js', f), 'utf-8'), ctx, { filename: f }));

ctx.project = JSON.parse(fs.readFileSync(path.join(root, 'doc', 'demo.mixo_prj'), 'utf-8'));
const html = vm.runInContext(`renderReport(new Const().reconstructIndexWrk(project), 'Demo <project>', '2026-10-03')`, ctx);

assert.match(html, /<h1>Demo &lt;project&gt;<\/h1>/, 'title is escaped');
assert.match(html, /Behringer X32 Compact/);
assert.match(html, /<td>FOH<\/td><td>AES50 A<\/td><td>Drums<\/td><td>AES50 A<\/td>/, 'link table');
assert.match(html, /KICK<\/span>/);
assert.match(html, /FOH — Input channels/);

// Routed channel and escaping of user names
vm.runInContext(`
  var wrk = new IndexWrk();
  wrk.devices.push(new Device('x32c', 0, 16, 8, 32, 16, 6, 1, 8), new Device('sd8', 1, 8, 8, 0, 0, 0, 0, 0));
  wrk.devices[1].inputs[2].setName('<b>Kick');
  wrk.devices[0].channels[0].setDeviceId('1'); wrk.devices[0].channels[0].setIO('2');
  wrk.devices[0].channels[0].setSource('A'); wrk.devices[0].channels[0].setChannelCnt('3');
`, ctx);
const routed = vm.runInContext(`renderReport(wrk, 'T', 'D')`, ctx);
assert.match(routed, /&lt;b&gt;Kick<\/span><\/td><td>A3<\/td><td>sd8 in 3<\/td>/);
assert.doesNotMatch(routed, /<b>Kick/);

if (process.argv[2]) {
  const css = fs.readFileSync(path.join(root, 'src', 'styles', 'report.css'), 'utf-8');
  fs.writeFileSync(process.argv[2], `<!DOCTYPE html><meta charset="utf-8"><style>${css}</style>${html}`);
}
console.log('report tests passed');
