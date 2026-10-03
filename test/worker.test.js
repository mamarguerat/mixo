// Run: node test/worker.test.js
// Loads the renderer scripts into a sandbox with a stubbed controller.
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

process.env.NODE_ENV = 'development';
const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', 'js', f), 'utf-8');
const ctx = vm.createContext({ require, process, console: { log() {}, error: console.error }, module: {} });
['const.js', 'beans/device.js', 'beans/link.js', 'beans/connector.js', 'beans/channel.js', 'beans/deviceTypeLUT.js', 'wrk/indexWrk.js']
  .forEach(f => vm.runInContext(src(f), ctx, { filename: f }));
vm.runInContext(`
  var constants = new Const();
  var indexCtrl = { drawCanvas() {}, drawLines() {} };
  var indexWrk = new IndexWrk();
`, ctx);
// JSON round-trip so sandbox arrays/objects compare against this realm's
const run = (code) => { const r = vm.runInContext(code, ctx); return typeof r === 'object' ? JSON.parse(JSON.stringify(r)) : r; };

// Main view context menu (#38)
run(`indexWrk.addDevice('x32c'); indexWrk.addDevice('sd16', 120, 200); indexWrk.addLink(0, 'A', 1, 'A');`);
assert.deepStrictEqual(run(`indexWrk.getDevicePosId(1)`), [120, 200]);
run(`indexWrk.getDeviceFromId(1).inputs[0].setName('Kick'); indexWrk.getDeviceFromId(1).setName('Stage');`);
run(`indexWrk.pasteDevice(JSON.parse(JSON.stringify(indexWrk.getDeviceFromId(1))), 300, 300);`);
assert.strictEqual(run(`indexWrk.devices.length`), 3);
assert.strictEqual(run(`indexWrk.getDeviceFromId(2).inputs[0].getName()`), 'Kick');
assert.strictEqual(run(`indexWrk.links.length`), 1, 'paste keeps no links');
run(`indexWrk.resetDeviceId(1)`);
assert.strictEqual(run(`indexWrk.getDeviceFromId(1).inputs[0].getName()`), '');
assert.strictEqual(run(`indexWrk.getDeviceFromId(1).getName()`), 'Stage');
assert.strictEqual(run(`indexWrk.getDeviceFromId(1).inputs.length`), 16);
assert.strictEqual(run(`indexWrk.links.length`), 1, 'reset keeps links');
run(`indexWrk.removeLinksId(1)`);
assert.strictEqual(run(`indexWrk.links.length`), 0);
run(`indexWrk.addLink(0, 'B', 2, 'A'); indexWrk.removeDeviceId(2)`);
assert.strictEqual(run(`indexWrk.links.length + indexWrk.devices.length`), 2, 'delete removes device and its links');

// IO view context menu (#39)
assert.strictEqual(run(`incrementName('Tom 1')`), 'Tom 2');
assert.strictEqual(run(`incrementName('Vox09')`), 'Vox10');
assert.strictEqual(run(`incrementName('Vocal')`), 'Vocal');
assert.strictEqual(run(`incrementName('Overheads 9')`), 'Overheads 10', '12 chars max');
assert.strictEqual(run(`incrementName('Overheads 99')`), 'Overheads100', 'trims the name, not the number');
run(`var c = indexWrk.getConnector(0, 'i', 0); c.setName('Kick'); c.setColor('RD', true); c.setPhantomPower(true);`);
run(`indexWrk.setConnector(0, 'i', 1, JSON.parse(JSON.stringify(c)))`);
assert.deepStrictEqual(run(`indexWrk.getConnector(0, 'i', 1)`), run(`c`));
run(`indexWrk.setConnector(0, 'o', 0, JSON.parse(JSON.stringify(c)))`);
assert.strictEqual(run(`indexWrk.getConnector(0, 'o', 0).getName()`), 'Kick');
assert.strictEqual(run(`indexWrk.getConnector(0, 'o', 0).getPhantomPower()`), false, 'no +48V on outputs');
run(`indexWrk.setConnector(0, 'i', 1, new Connector())`);
assert.deepStrictEqual(run(`indexWrk.getConnector(0, 'i', 1)`), run(`new Connector()`));

console.log('worker tests passed');
