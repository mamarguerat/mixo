const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path')
let win

const menuTemplate = [
  { role: 'appMenu' },
  {
    label: 'File',
    submenu: [
      {
        label: 'Load',
        accelerator: 'CmdOrCtrl+O',
        click: () => console.log('Oh, hi there!'),
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
      },
      {
        label: 'Export documentation',
        submenu: [
          {
            label: 'PDF',
            accelerator: 'Shift+CmdOrCtrl+E',
          }
        ]
      }
    ]
  },
  {
    label: 'Add',
    submenu: [
      {
        label: 'Behringer',
        submenu: [
          {
            label: 'X32',
          },
          {
            label: 'X32 Compact',
            click: () => win.webContents.send('menu', 'x32c'),
          },
          {
            label: 'X32 Producer'
          },
          {
            label: 'X32 Rack'
          },
          {
            label: 'X32 Core'
          },
          { type: 'separator' },
          {
            label: 'Wing'
          },
          {
            label: 'SD8'
          },
          {
            label: 'SD16',
            click: () => win.webContents.send('menu', 'sd16'),
          },
          {
            label: 'S32'
          }
        ]
      },
      {
        label: 'Midas',
        submenu: [
          {
            label: 'M32 Live'
          },
          {
            label: 'M32R'
          },
          {
            label: 'M32R Live'
          },
          {
            label: 'M32C'
          },
          { type: 'separator' },
          {
            label: 'DL16'
          },
          {
            label: 'DL32'
          },
          {
            label: 'DL231'
          },
          {
            label: 'DL251'
          }
        ]
      }
    ]
  },
  { role: 'viewMenu' }
];
const menu = Menu.buildFromTemplate(menuTemplate)

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  Menu.setApplicationMenu(menu);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      Menu.setApplicationMenu(menu);
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('window', (event, arg) => {
  const window = new BrowserWindow({
    height: 600,
    width: 800
  });
  window.loadURL('https://stackoverflow.com/questions/53390798/opening-new-window-electron');
  window.once('ready-to-show', () => {
    window.show()
  })
})