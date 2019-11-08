const { app, BrowserWindow } = require('electron');
const events = require('./event');
/*
The variable to use would be process.platform

On Mac the variable returns darwin. On Windows, it returns win32 (even on 64 bit).

Possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
url: https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
*/
// const detectedOs  = process.platform;

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 500,
    center: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile('./ui/index.html');
  mainWindow.webContents.openDevTools();
  events.init(mainWindow);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
