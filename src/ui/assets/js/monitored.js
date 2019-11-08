
/* eslint-disable no-undef */
$(document).ready(function () {
  function loadMonitoredFolders() {
    fetchMonitoredFolders().then((monitoredFolders) => {
      // console.log(d);
      let count = 1;
      let html = '';
      monitoredFolders.forEach((folder) => {
        html += `
          <tr>
            <td>${count}</td>
            <td><span class="show-in-folder-link" data-link="${folder.full_path}">${folder.full_path}</span></td>
            <td><span class="uk-margin-small-right delete-icon" data-id="${folder.id}" href="#modal-center" uk-toggle uk-icon="trash"></span></td>
          </tr>
        `;
        count += 1;
      });
      $('.monitored-folders').html(html);
    });
  }
  loadMonitoredFolders();
  $(document).on('click', '.show-in-folder-link', function () {
    shell.showItemInFolder($(this).data('link'));
  });
  $(document).on('click', '.delete-icon', function () {
    window.PathToRemove = $(this).data('id');
  });
  $(document).on('click', '.confirm-folder-delete', function () {
    deleteMonitoredFolder(window.PathToRemove).then(() => {
      loadMonitoredFolders();
      $('.uk-modal-close-default').click();
    });
  });
  $(document).on('click', '.new-monitored-folder', function () {
    ipcEvents.openFolderPicker();
  });
  window.ipcEvents.folderPicked(function (paths) {
    newMonitoredFolder(paths[0]).then(() => {
      loadMonitoredFolders();
    });
  });
});
