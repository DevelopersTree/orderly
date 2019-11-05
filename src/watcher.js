/* eslint-disable no-useless-escape */
const chokidar = require('chokidar');
const debug = require('debug');
const path = require('path');
const core = require('./core');
const query = require('./query');

function launch(directory) {
  // chokidar.watch();
  const watcher = chokidar.watch(directory, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
    },
    ignorePermissionErrors: true,
    depth: 0,
  });
  debug.log('loading extentions...');

  query.fetchExtentions().then((extentions) => {
    debug.log('started watching ...');
    watcher.on('add', (p, event) => core.fileHandler(extentions, path.dirname(p), p, event));
    debug.log('started initial scan...');
    core.oneTimeScan(extentions, directory);
  });
}

module.exports = {
  launch,
};
