/* eslint-disable no-undef */
$(document).ready(() => {
    $('.picker-container .bordered-container').click(function(){
        window.ipcEvents.openFolderPicker();
    })
    window.ipcEvents.folderPicked((data)=>{
        $('.picker-container').load('organizingFiles.html');
    })
    let filesMoved = 1 ;
    window.ipcEvents.fileWillBeMoved((data)=>{
        const filesLength = data.files.length;
        const percentage = (filesMoved/filesLength)* 100;
        console.log(percentage)
        $(".progress-status").append(`${data.statePath}\n`);
        filesMoved++;
    })
});
