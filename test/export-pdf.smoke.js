// Run: npx electron test/export-pdf.smoke.js
// Renders doc/demo.mixo_prj through report.html and printToPDF, like File > Export documentation > PDF.
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

process.env.NODE_ENV = 'development';
app.whenReady().then(async () => {
  const worker = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'doc', 'demo.mixo_prj'), 'utf-8'));
  const report = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
  await report.loadFile(path.join(__dirname, '..', 'src', 'report.html'));
  const rendered = new Promise(resolve => report.webContents.ipc.once('report-rendered', resolve));
  report.webContents.send('report', { worker, title: 'demo', date: 'today' });
  await rendered;
  const pdf = await report.webContents.printToPDF({ pageSize: 'A4', printBackground: true });
  assert.strictEqual(pdf.subarray(0, 4).toString(), '%PDF');
  if (process.argv[2]) {
    fs.writeFileSync(process.argv[2], pdf);
  }
  console.log(`export pdf smoke test passed (${pdf.length} bytes)`);
  app.exit(0);
}).catch(err => { console.error(err); app.exit(1); });
