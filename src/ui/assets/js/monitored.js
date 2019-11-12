
/* eslint-disable no-undef */
$(document).ready(function () {
  function reloadService() {
    ipcEvents.serviceStatusChange('reload');
  }
  function loadMonitoredFolders() {
    fetchMonitoredFolders().then((monitoredFolders) => {
      // console.log(d);
      if (monitoredFolders.length === 0) $('.monitored-setting-btn').css('display', 'none');
      if (monitoredFolders.length > 0) $('.monitored-setting-btn').css('display', 'initial');
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
  function selectedMonitoreStatus() {
    fetchOption('monitor_folders').then(([record]) => {
      $('.mnitored-service-dropdown').val(record.value);
    });
  }
  selectedMonitoreStatus();
  $(document).on('change', '.mnitored-service-dropdown', function () {
    const value = $(this).val();
    setOption('monitor_folders', value).then(() => {
      ipcEvents.serviceStatusChange((value === '0') ? 'stop' : 'start');
    });
  });
  $(document).on('click', '.show-in-folder-link', function () {
    shell.showItemInFolder($(this).data('link'));
  });
  $(document).on('click', '.delete-icon', function () {
    window.PathToRemove = $(this).data('id');
  });
  $(document).on('click', '.confirm-folder-delete', function () {
    deleteMonitoredFolder(window.PathToRemove).then(() => {
      loadMonitoredFolders();
      reloadService();
      $('.uk-modal-close-default').click();
    });
  });
  $(document).on('click', '.new-monitored-folder', function () {
    ipcEvents.openFolderPicker();
  });
  window.ipcEvents.folderPicked(function (paths) {
    newMonitoredFolder(paths[0]).then(() => {
      loadMonitoredFolders();
      reloadService();
    });
  });
  window.ipcEvents.serviceStarted(function () {
    UIkit.notification({
      message: 'Now Monitoring',
      timeout: 700,
      pos: 'bottom-center',
    });
  });
  window.ipcEvents.serviceStoped(function () {
    UIkit.notification({
      message: 'Service Stoped',
      timeout: 700,
      pos: 'bottom-center',
    });
  });
});
