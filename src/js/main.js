const { dialog, app, BrowserWindow, ipcMain, Menu } = require('electron');
const join = require('path').join;
const fs = require('fs');
const openAboutWindow = require('about-window').default;
const deviceTypeLUT = require('./beans/deviceTypeLUT.js');
const isMac = process.platform === 'darwin'
const devType = new deviceTypeLUT();
let win
let filePath = "";

// Autoupdater from https://samuelmeuli.com/blog/2019-04-07-packaging-and-publishing-an-electron-app/
const { autoUpdater } = require("electron-updater")

app.on("ready", () => {
  autoUpdater.checkForUpdatesAndNotify();
});

// MARK: Menu template
var menuTemplate = [
  // { role: 'appMenu' },
  ...(isMac
    ? [
      {
        label: app.name,
        submenu: [
          {
            label: 'About',
            click: () => aboutWindow()
          },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }
    ]
    : []),

  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: 'Load',
        accelerator: 'CmdOrCtrl+O',
        click: () => loadFile(),
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: () => win.webContents.send('file', { function: 'save' }),
      },
      {
        label: 'Save as',
        click: () => win.webContents.send('file', { function: 'saveas' }),
      },
      {
        label: 'Export documentation',
        submenu: [
          {
            label: 'PDF',
            accelerator: 'Shift+CmdOrCtrl+E',
          }
        ]
      },
      { type: 'separator' },
      ...(isMac
        ? [
          { role: 'close' }
        ]
        : [
          { role: 'quit' }
        ]
      ),
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startSpeaking' },
              { role: 'stopSpeaking' }
            ]
          }
        ]
        : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
    ]
  },
  {
    label: 'Add',
    submenu: []
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ]
        : [
          { role: 'close' }
        ])
    ]
  },
  ...(app.isPackaged
    ? []
    : [{ role: 'viewMenu' }]
  ),
  {
    role: 'help',
    submenu: [
      ...(isMac
        ? []
        : [
          {
            label: 'About',
            click: () => aboutWindow()
          },
        ]),
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://martinmarguerat.ch')
        }
      },
      {
        label: 'Report a bug',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/mamarguerat/mixo/issues')
        }
      }
    ]
  },
];

// MARK: Create window
const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile(join(__dirname, '..', 'index.html'));
};

app.whenReady().then(() => {
  if (!app.isPackaged) {
    process.env.NODE_ENV = 'development';
  }

  let submenu = new Array();
  let brands = devType.getBrands();

  brands.forEach(function (brand, idx, brands) {
    submenu.push({ label: brand, submenu: [] });
  
    mixers = devType.getBrandMixers(brand);
    mixers.forEach(mixer => {
      let object = {
        label: mixer.FullName,
        accelerator: mixer.accelerator,
        click: () => win.webContents.send('menu', { action: 'add', type: mixer.ID }),
      }
      submenu[idx].submenu.push(object);
    })
    submenu[idx].submenu.push({ type: 'separator' });
    stageBoxes = devType.getBrandStageBoxes(brand);
    stageBoxes.forEach(stageBox => {
      let object = {
        label: stageBox.FullName,
        accelerator: stageBox.accelerator,
        click: () => win.webContents.send('menu', { action: 'add', type: stageBox.ID }),
      }
      submenu[idx].submenu.push(object);
    })
  })

  menuTemplate[isMac?3:2].submenu = submenu;
  const menu = Menu.buildFromTemplate(menuTemplate)

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
  // if (process.platform !== 'darwin') {
  app.quit();
  // }
});

var childWindows = [];

// MARK: IPC events
ipcMain.on('window', (event, arg) => {
  createChildWindow(join(__dirname, '..', 'device-detail.html'));
  childWindows[childWindows.length - 1].webContents.on('did-finish-load', () => {
    childWindows[childWindows.length - 1].webContents.send('ready', arg);
    childWindows[childWindows.length - 1].setTitle('Mixo • ' + arg.title)
  });
  childWindows[childWindows.length - 1].on('closed', function () {
    childWindows.splice(childWindows[childWindows.length - 1].index, 1);
  })
});

ipcMain.on('file', (event, arg) => {
  let jsonObject = JSON.parse(arg.json);
  jsonObject.version = app.getVersion();
  arg.json = JSON.stringify(jsonObject, null, 2);
  if ('saveas' == arg.function || ('save' == arg.function && filePath == "")) {
    dialog.showSaveDialog({
      title: 'Save Mixo project',
      filters: [
        { name: 'Mixo project', extensions: ['mixo_prj'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    }).then(result => {
      if (!result.canceled) {
        filePath = result.filePath;
        win.setTitle('Mixo • ' + filePath.replace(/^.*[\\\/]/, '').slice(0, -9));
        // Write the JSON to the chosen file
        fs.writeFile(result.filePath, arg.json, (err) => {
          if (err) throw err;
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }
  else if ('save' == arg.function && filePath != "") {
    fs.writeFile(filePath, arg.json, (err) => {
      if (err) throw err;
    })
  }
})

// MARK: IPC windows
ipcMain.on('forward-to-main', (event, arg) => {
  win.webContents.send('request-data-changes', arg);
});

ipcMain.on('forward-to-childs', (event, arg) => {
  childWindows.forEach(childWindow => {
    childWindow.webContents.send('new-data', arg);
  });
});

// MARK: Functions
function loadFile() {
  dialog.showOpenDialog({
    title: 'Open Mixo project',
    filters: [
      { name: 'Mixo project', extensions: ['mixo_prj'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  }).then(result => {
    if (!result.canceled) {
      filePath = result.filePaths[0];
      win.setTitle('Mixo • ' + filePath.replace(/^.*[\\\/]/, '').slice(0, -9));
      // Read the chosen file
      fs.readFile(result.filePaths[0], 'utf-8', (err, data) => {
        if (err) throw err;
        // Parse the JSON data
        let jsonData = JSON.parse(data);
        // Extract the arrays
        win.webContents.send('file', {
          function: 'load',
          jsonData: jsonData
        });
      });
    }
  }).catch(err => {
    console.log(err);
  });
}

// function to create a child window
function createChildWindow(fileName) {
  childWindows.push(new BrowserWindow({
    width: 1030,
    height: 460,
    menuBarVisible: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  );
  childWindows[childWindows.length - 1].index = childWindows.length - 1;
  childWindows[childWindows.length - 1].loadFile(fileName)
}

function aboutWindow() {
  openAboutWindow({
    icon_path: (
      process.env.NODE_ENV === 'development'
        ? '../../public/assets/icon.png'
        : join(process.resourcesPath, 'public', 'assets', 'icon.png')
    ),
    package_json_dir: (
      process.env.NODE_ENV === 'development'
        ? join(__dirname, '..', '..')
        : process.resourcesPath
    ),
    win_options: {
      parent: win,
      modal: true,
      titleBarStyle: "hidden",
      movable: false,
      resizable: false,
    },
    css_path: join(__dirname, "..", "styles", "style.css"),
    bug_link_text: "Report a bug",
    product_name: "Mixo",
    show_close_button: "Close",
    adjust_window_size: true,
    description: "Routing simplified",
  })
}
