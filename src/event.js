const { ipcMain, dialog } = require('electron');
const { oneTimeScan } = require('./core');
const query = require('./query');

function folderPickerEvents() {
  ipcMain.on('open-folder-picker', (event, operationToBePerformed) => {
    dialog.showOpenDialog({ properties: ['openDirectory'] }).then((response) => {
      if (!response.canceled) {
        //  operations handling
        if (operationToBePerformed === 'organizeOnce') {
          query.fetchExtentions().then((extentions) => {
            oneTimeScan(extentions, response.filePaths[0], (files) => {
            //  lunch folder-organized event in ipcRendre
              event.sender.send('folder-organized', files);
            });
          }).catch(() => { /**/ });
        }

        event.sender.send('folder-picked', response.filePaths);
      }
    }).catch(() => {

    });
  });
}

module.exports = {
  init: (mainWindow) => {
    folderPickerEvents(mainWindow);
  },
};
