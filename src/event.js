const { ipcMain, dialog } = require('electron');
const debug = require('debug');
const { oneTimeScan } = require('./core');
const query = require('./query');
const serviceManager = require('./service-manager');

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


function serviceActionHanler(event, action) {
  switch (action) {
    case 'start':
      serviceManager.startService(() => {
        event.sender.send('service-started', true);
      });
      break;
    case 'stop':
      serviceManager.stopService(() => {
        event.sender.send('service-stoped', true);
      });
      break;
    case 'reload':
      serviceManager.reloadService(() => {
        event.sender.send('service-reloaded', true);
      });
      break;
    default:
      debug.log('default called');
  }
}

function serviceStatusChange() {
  ipcMain.on('service-status-change', (event, operationToBePerformed) => {
    serviceActionHanler(event, operationToBePerformed);
  });
}


module.exports = {
  init: (mainWindow) => {
    folderPickerEvents(mainWindow);
    serviceStatusChange();
  },
};
