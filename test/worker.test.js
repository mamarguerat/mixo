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

// Undo / redo (#34)
run(`var h = new UndoHistory(3); h.record(JSON.stringify(indexWrk)); indexWrk.addDevice('x32c'); h.record(JSON.stringify(indexWrk)); h.record(JSON.stringify(indexWrk));`);
assert.strictEqual(run(`h.states.length`), 2, 'unchanged state is not recorded');
run(`indexWrk = constants.reconstructIndexWrk(JSON.parse(h.undo()))`);
assert.strictEqual(run(`indexWrk.devices.length`), 0);
assert.strictEqual(run(`h.undo()`), undefined, 'nothing before the first state');
run(`indexWrk = constants.reconstructIndexWrk(JSON.parse(h.redo()))`);
assert.strictEqual(run(`indexWrk.devices.length`), 1);
assert.strictEqual(run(`h.redo()`), undefined);
run(`h.undo(); h.record('other')`);
assert.strictEqual(run(`h.redo()`), undefined, 'new change drops redo states');
run(`h.record('a'); h.record('b'); h.record('c')`);
assert.deepStrictEqual(run(`h.states`), ['a', 'b', 'c'], 'capped at the limit');

console.log('worker tests passed');
