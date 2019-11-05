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
      'monitored_folder.name',
      'monitored_folder.full_path',
    ).limit(25);
}
module.exports = {
  fetchExtentions,
  fetchMonitoredFolders,
};
