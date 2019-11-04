/* eslint-disable no-undef */
$(document).ready(() => {
    $('.picker-container .bordered-container').click(function(){
        window.ipcEvents.openFolderPicker();
    })
    $(document).on('click', '.another-folder', function(){
        $("#app").load('folderPicker.html');
    })
    window.ipcEvents.folderPicked((data)=>{
        $('.picker-container').load('organizingFiles.html');
    })
    UIkit.util.ready(function () {
        let filesMoved = 1;        
        window.ipcEvents.fileWillBeMoved((data)=>{
            console.log(`${data.statePath}`)
            // var bar = document.getElementById('js-progressbar');
            // let filesLength = data.files.length;
            // if(filesLength === 0){
            //     $('.status-icon').html(`<span uk-icon="icon: check; ratio: 4;"></span>`);
            //     $(`<a href="#" class="another-folder">Organize Another Folder</a>`).insertAfter('progress')
            // } else {
            //     bar.value  = percentage;
            //     if(filesMoved === filesLength-1 ){
            //         $('.status-icon').html(`<span uk-icon="icon: check; ratio: 4;"></span>`);
            //         $(`<a href="#" class="another-folder">Organize Another Folder</a>`).insertAfter('progress')
            //     }
            // }
            // $(".progress-status").prepend(`${data.statePath}\n`);
            // filesMoved++;
        });
        
    });
    
});
