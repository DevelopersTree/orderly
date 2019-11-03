const {oneTimeScan} = require('./core')
const query = require('./query');
const { ipcMain, dialog, ipcRenderer } = require('electron');

function folderPickerEvents(window){
    ipcMain.on('open-folder-picker', ()=>{
        dialog.showOpenDialog({ properties: ['openDirectory'] }).then((response)=>{
            if(!response.canceled){
                window.webContents.send('folder-picked', response.filePaths);
                query.fetchExtentions().then((extentions)=>{
                    oneTimeScan(extentions, response.filePaths[0], (files, index, statePath)=>{
                        //  lunch file-will-move event in ipcRendre
                        window.webContents.send('file-will-move', {files, index, statePath});
                    })
                });
            }
        }).catch((e)=>{
            console.log('error',e)
        }); 
    })
}

module.exports = {
    init:(mainWindow)=>{
        folderPickerEvents(mainWindow);
    }
}