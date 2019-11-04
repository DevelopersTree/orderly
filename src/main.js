const { app, BrowserWindow } = require('electron');
const events = require('./event');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    frame: true,
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
