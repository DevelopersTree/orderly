const {oneTimeScan} = require('./core')
const query = require('./query');
const { ipcMain, dialog, ipcRenderer } = require('electron');

function folderPickerEvents(window){
    ipcMain.on('open-folder-picker', (event, arg)=>{
        dialog.showOpenDialog({ properties: ['openDirectory'] }).then((response)=>{
            if(!response.canceled){
                event.sender.send('folder-picked', response.filePaths);
                query.fetchExtentions().then((extentions)=>{
                    oneTimeScan(extentions, response.filePaths[0], (files, index, statePath)=>{
                        //  lunch file-will-move event in ipcRendre
                        // setTimeout(() => {
                        //     console.log(statePath)
                        // }, 500);
                        // window.webContents.send('file-will-move', {files, index, statePath});
                        event.sender.send('file-will-move', {files, index, statePath});
                    })
                });
            }
        }).catch((e)=>{
            // console.log('error',e)
        }); 
    })
}

module.exports = {
    init:(mainWindow)=>{
        folderPickerEvents(mainWindow);
    }
}