/* eslint-disable no-undef */
$(document).ready(function () {
  $(document).on('click', '.show-in-folder-link', function () {
    shell.showItemInFolder('/home/aram/Desktop/watched2/');
  });
  $(document).on('click', '.delete-icon', function () {
    window.PathToRemove = $(this).data('id');
  });
  $(document).on('click', '.confirm-folder-delete', function () {
    alert(window.PathToRemove);
  });
  $(document).on('click', '.new-monitored-folder', function () {
    ipcEvents.openFolderPicker();
  });
  window.ipcEvents.folderPicked(function () {
    alert('yayy folder picked');
  });
});
