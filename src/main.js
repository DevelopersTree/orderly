// const watcher = require('./watcher');

// const dirToWatch = '/Users/hozan/Desktop/watched';
// watcher.lunch(dirToWatch);
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('./ui/index.html');
}

app.on('ready', createWindow);
