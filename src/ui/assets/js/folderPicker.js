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
            var bar = document.getElementById('js-progressbar');
            const filesLength = data.files.length;
            console.log('yayy called')
            if(filesLength === 0){
                $('.status-icon').html(`<span uk-icon="icon: check; ratio: 4;"></span>`);
                $(`<a href="#" class="another-folder">Organize Another Folder</a>`).insertAfter('progress')
            } else {
                const percentage = (filesMoved/filesLength)* 100;
                bar.value  = percentage;
                console.log(filesMoved, filesLength)
                if(filesMoved === filesLength-1 ){
                    $('.status-icon').html(`<span uk-icon="icon: check; ratio: 4;"></span>`);
                    $(`<a href="#" class="another-folder">Organize Another Folder</a>`).insertAfter('progress')
                }
            }
            $(".progress-status").prepend(`${data.statePath}\n`);
            filesMoved++;
        });
        
    });
    
});
