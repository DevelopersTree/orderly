/* eslint-disable no-undef */
$(document).ready(function () {
  $(document).on('click', '.picker-container .folder-picker-action-toggler', function () {
    window.ipcEvents.openFolderPicker();
  });
  $(document).on('click', '.another-folder', function () {
    $('#app').load('folderPicker.html');
  });
  window.ipcEvents.folderPicked(function () {
    $('.picker-container').load('organizingFiles.html');
  });
  window.ipcEvents.folderOrganized((files) => {
    $('.status-icon').html('<span uk-icon="icon: check; ratio: 4;"></span>');
    $(`<h5 class="files-moved" style="margin: 10px;">${files.length} files found <h5>`).insertAfter('.status-icon');
    $('<a href="#" class="another-folder">Organize Another Folder</a>').insertAfter('.files-moved');
  });
});
