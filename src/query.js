const storage = require('./config/storage');

function fetchExtentions() {
  return storage('extention')
    .select(
      'extention.ext',
      'folder.name as folder_name',
    )
    .innerJoin('folder_extention', 'folder_extention.extention_id', 'extention.id')
    .innerJoin('folder', 'folder.id', 'folder_extention.folder_id');
}
function fetchMonitoredFolders() {
  return storage('monitored_folder')
    .select(
      'monitored_folder.id',
      'monitored_folder.name',
      'monitored_folder.full_path',
    ).limit(25);
}
function deleteMonitoredFolder(id) {
  return storage('monitored_folder').del().where('id', id);
}
function newMonitoredFolder(fullPath) {
  return storage('monitored_folder').count('id as count')
    .where('full_path', fullPath)
    .limit(1)
    .then(([data]) => {
      if (data.count <= 0) {
        return storage('monitored_folder').insert({
          full_path: fullPath,
          name: 'unnamed',
        });
      }
      return Promise.reject(new Error('already exists'));
    });
}

module.exports = {
  fetchExtentions,
  fetchMonitoredFolders,
  deleteMonitoredFolder,
  newMonitoredFolder,
};
