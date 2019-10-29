/* eslint-disable no-useless-escape */
const chokidar = require('chokidar');
const core = require('./core');

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
  watcher.on('add', (path, event) => core.organize(directory, path, event));
}

module.exports = {
  lunch,
};
