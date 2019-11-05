const { ipcMain, dialog } = require('electron');
const { oneTimeScan } = require('./core');
const query = require('./query');

function folderPickerEvents(window) {
  ipcMain.on('open-folder-picker', (event) => {
    dialog.showOpenDialog({ properties: ['openDirectory'] }).then((response) => {
      if (!response.canceled) {
        event.sender.send('folder-picked', response.filePaths);
        query.fetchExtentions().then((extentions) => {
          oneTimeScan(extentions, response.filePaths[0], (files) => {
            //  lunch folder-organized event in ipcRendre
            event.sender.send('folder-organized', files);
          });
        }).catch((e) => {
          console.log(e);
        });
      }
    }).catch((e) => {
      console.log('error',e)
    });
  });
}

module.exports = {
  init: (mainWindow) => {
    folderPickerEvents(mainWindow);
  },
};
