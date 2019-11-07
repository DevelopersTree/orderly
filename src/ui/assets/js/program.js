/* eslint-disable no-undef */
$(document).ready(() => {
  $('#app').load('folderPicker.html');
  $('.link').click(function () {
    ipcRenderer.removeAllListeners();
    $(document).off('click');
    $('#app').load($(this).data('page'));
  });
});
