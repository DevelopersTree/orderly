/* eslint-disable no-undef */
$(document).ready(() => {
  $('#app').load('folderPicker.html');
  $('.link').click(function () {
    ipcRenderer.removeAllListeners();
    $(document).off('click');
    $(document).off('change');
    $('#app').load($(this).data('page'));
  });
});
