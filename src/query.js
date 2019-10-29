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
module.exports = {
  fetchExtentions,
};
