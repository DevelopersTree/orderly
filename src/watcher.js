/* eslint-disable no-useless-escape */
const chokidar = require('chokidar');
const debug = require('debug');
const core = require('./core');
const query = require('./query');

function lunch(directory) {
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
    // const extentions = rawExtentions.map((x) => x.ext);
    watcher.on('add', (path, event) => core.organize(extentions, directory, path, event));
  });
}

module.exports = {
  lunch,
};
