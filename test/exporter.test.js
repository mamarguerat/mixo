// Run with `npm test`: checks the scn export on the demo project (FOH x32c -A-> SD8 -B-> SD16)
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const src = path.join(__dirname, '..', 'src', 'js');
const files = ['const.js', 'beans/connector.js', 'beans/channel.js', 'beans/device.js', 'beans/link.js',
  'beans/deviceTypeLUT.js', 'wrk/indexWrk.js', 'exporter.js'];
const code = files.map(f => fs.readFileSync(path.join(src, f), 'utf8')).join('\n') + '\n({ Const, buildScn })';
const { Const, buildScn } = vm.runInNewContext(code, { require, process: { env: { NODE_ENV: 'development' } }, console: { log() {}, error: console.error }, module: {} });

function demo() {
  const wrk = new Const().reconstructIndexWrk(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'doc', 'demo.mixo_prj'))));
  const [drums, foh, stage] = [1, 2, 3].map(id => wrk.getDeviceFromId(id));
  stage.inputs.forEach((input, i) => input.setName(`ST${i + 1}`));
  foh.inputs[0].setName('TALK');
  foh.inputs[0].setPhantomPower(true);
  foh.inputs[0].setPhaseInvert(true);
  foh.inputs[8].setName('PC');
  return { wrk, drums, foh, stage };
}

function assign(mixer, channel, deviceId, io) {
  mixer.channels[channel].setDeviceId(String(deviceId));
  mixer.channels[channel].setIO(String(io));
}

// Routing blocks, sources, headamps on a chained AES50 setup
{
  const { wrk, foh } = demo();
  assign(foh, 0, 1, 0);   // Drums input 1 = A1
  assign(foh, 1, 3, 0);   // Stage input 1 = A9 (after the 8 drums inputs)
  assign(foh, 2, 2, 0);   // FOH local input 1
  const { text, errors } = buildScn(wrk, foh);
  assert.strictEqual(errors.length, 0, errors.join('; '));
  assert.strictEqual(text, [
    '#4.0# "FOH" "" %000000000 1',
    '/config/routing/IN A1-8 A9-16 AN1-8 AN25-32 AUX/CR',
    '/ch/01/config "KICK" 2 RD 1',
    '/ch/01/preamp +0.0 OFF OFF 24 101',
    '/ch/02/config "ST1" 50 YE 9',
    '/ch/02/preamp +0.0 OFF OFF 24 101',
    '/ch/03/config "TALK" 51 WH 17',
    '/ch/03/preamp +0.0 ON OFF 24 101',
    '/headamp/000 +0.0 ON',
    '/headamp/032 +0.0 OFF',
    '/headamp/040 +0.0 OFF',
  ].join('\n') + '\n');
}

// A 5th block of 8 inputs can't be routed
{
  const { wrk, foh } = demo();
  assign(foh, 0, 1, 0);   // A1-8
  assign(foh, 1, 3, 0);   // A9-16
  assign(foh, 2, 3, 8);   // A17-24
  assign(foh, 3, 2, 0);   // AN1-8
  assign(foh, 4, 2, 8);   // AN9-16
  const { errors } = buildScn(wrk, foh);
  assert.strictEqual(errors.length, 1);
  assert.match(errors[0], /^Channel 05: AN9-16 would be a 5th input block/);
}

// Source no longer connected to the mixer
{
  const { wrk, foh } = demo();
  assign(foh, 0, 1, 5);
  wrk.links = [];
  assert.match(buildScn(wrk, foh).errors[0], /^Channel 01: its source is no longer connected/);
}

console.log('exporter ok');
