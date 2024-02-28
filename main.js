const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
let win

// Autoupdater from https://samuelmeuli.com/blog/2019-04-07-packaging-and-publishing-an-electron-app/
const { autoUpdater } = require("electron-updater")

app.on("ready", () => {
	autoUpdater.checkForUpdatesAndNotify();
});

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
            label: 'SD8',
            click: () => win.webContents.send('menu', 'sd8'),
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
  if (!app.isPackaged)
  {
    process.env.NODE_ENV = 'development';
  }

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

var childWindow;

ipcMain.on('window', (event, arg) => {
  createChildWindow("device-detail.html", "device-detail-preload.js")
  childWindow.webContents.send('type', arg)
})

// function to create a child window
function createChildWindow(fileName, preloadFileName) {
  childWindow = new BrowserWindow({
    width: 700,
    height: 500,
    parent: win, // accessing the parent window
    menuBarVisible: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, preloadFileName),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  childWindow.loadFile(fileName)
}