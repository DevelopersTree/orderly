/* eslint-disable no-undef */
$(document).ready(() => {
  $('#app').load("folderPicker.html");
  $('.link').click(function() {
    $('#app').load($(this).data('page'));
  });
});
