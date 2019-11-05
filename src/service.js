/*
    manages services across os platforms to monitor folders
    when always monitor option is enabled this will be lunched ethier in win32, darwin or linux
*/
const debug = require('debug');
const _ = require('lodash');
const watcher = require('./watcher');
const { fetchMonitoredFolders } = require('./query');

(() => {
  debug.log('loading folders...');
  fetchMonitoredFolders().then((folders) => {
    debug.log('folders loaded ✓');
    if (folders.length === 0) {
      debug.log('no folders fond to monitor ✓');
    } else {
      const folderPaths = _.map(folders, (o) => o.full_path);
      watcher.launch(folderPaths);
    }
  }).catch(() => {
    debug.log('error in loading monitoring folders  ❌');
  });
})();
