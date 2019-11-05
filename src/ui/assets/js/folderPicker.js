/* eslint-disable no-undef */
$(document).ready(function () {
  $(document).on('click', '.picker-container .bordered-container', function () {
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
    $('<a href="#" class="another-folder">Organize Another Folder</a>').insertAfter('.status-icon');
  });
});
