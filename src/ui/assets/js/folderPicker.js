/* eslint-disable no-undef */
$(document).ready(function () {
  $('.picker-container .bordered-container').click(function () {
    window.ipcEvents.openFolderPicker();
  });
  $(document).on('click', '.another-folder', function () {
    $('#app').load('folderPicker.html');
  });
  window.ipcEvents.folderPicked(function () {
    $('.picker-container').load('organizingFiles.html');
  });
  UIkit.util.ready(function () {
    let filesMoved = 1;
    window.ipcEvents.fileWillBeMoved((data) => {
      const bar = document.getElementById('js-progressbar');
      const filesLength = data.files.length;
      if (filesLength === 0) {
        $('.status-icon').html('<span uk-icon="icon: check; ratio: 4;"></span>');
        $('<a href="#" class="another-folder">Organize Another Folder</a>').insertAfter('progress');
      } else {
        const percentage = (filesMoved / filesLength) * 100;
        bar.value = percentage;
        if (filesMoved === filesLength - 1) {
          $('.status-icon').html('<span uk-icon="icon: check; ratio: 4;"></span>');
          $('<a href="#" class="another-folder">Organize Another Folder</a>').insertAfter('progress');
        }
      }
      $('.progress-status').prepend(`${data.statePath}\n`);
      filesMoved += 1;
    });
  });
});
