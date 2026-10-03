/**
 * Build an X32/M32 scene (.scn) for a mixer.
 * Only exports what Mixo manages: input routing, channel config (name, icon, color, source),
 * phase invert and phantom power. Other parameters are left untouched on the console.
 * @param {IndexWrk} wrk
 * @param {Device} mixer
 * @returns {{ text: String, errors: String[] }}
 */
function buildScn(wrk, mixer) {
  const used = wrk.getAllUsedConnectors(mixer.getId(), 'i');
  const blocks = [];          // routing blocks of 8 inputs, X32 allows 4 (In 1-32)
  const channels = [];
  const headamps = new Map();
  const errors = [];

  mixer.channels.forEach((channel, i) => {
    if (channel.getIO() === "") return;
    const nb = String(i + 1).padStart(2, '0');
    const io = used.find(u => u.deviceID == channel.getDeviceId() && u.index == channel.getIO());
    if (!io) {
      errors.push(`Channel ${nb}: its source is no longer connected to ${mixer.getName()}`);
      return;
    }
    const n = io.inputCnt;  // 0-based input on Local / AES50 A / AES50 B
    const local = io.source === 'Local';
    if (n >= (local ? mixer.inputs.length : 48)) {
      errors.push(`Channel ${nb}: ${io.source} ${n + 1} does not exist`);
      return;
    }
    const start = n - n % 8;
    const block = `${local ? 'AN' : io.source}${start + 1}-${start + 8}`;
    if (!blocks.includes(block)) blocks.push(block);
    const slot = blocks.indexOf(block);
    if (slot > 3) {
      errors.push(`Channel ${nb}: ${block} would be a 5th input block, the mixer can only route 4 blocks of 8 inputs`);
      return;
    }
    const conn = wrk.getConnector(io.deviceID, 'i', io.index);
    const name = conn.getName().replace(/"/g, '');
    channels.push(`/ch/${nb}/config "${name}" ${conn.getIcon()} ${conn.getColorText()} ${slot * 8 + n % 8 + 1}`);
    // ponytail: trim and HPF are written with defaults until Mixo manages them
    channels.push(`/ch/${nb}/preamp +0.0 ${conn.getPhaseInvert() ? 'ON' : 'OFF'} OFF 24 101`);
    // Headamps: 000-031 local, 032-079 AES50 A, 080-127 AES50 B
    const headamp = n + { Local: 0, A: 32, B: 80 }[io.source];
    // ponytail: gain is written as +0.0 until Mixo manages it
    headamps.set(headamp, `/headamp/${String(headamp).padStart(3, '0')} +0.0 ${conn.getPhantomPower() ? 'ON' : 'OFF'}`);
  });

  // Unused routing blocks keep the X32 default
  const routing = ['AN1-8', 'AN9-16', 'AN17-24', 'AN25-32'].map((def, i) => blocks[i] || def);
  const text = [
    `#4.0# "${mixer.getName().replace(/"/g, '')}" "" %000000000 1`,
    `/config/routing/IN ${routing.join(' ')} AUX/CR`,
    ...channels,
    ...[...headamps.keys()].sort((a, b) => a - b).map(k => headamps.get(k)),
  ].join('\n') + '\n';
  return { text, errors };
}
