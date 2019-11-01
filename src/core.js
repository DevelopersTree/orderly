const moveFile = require('move-file');
const path = require('path');
const debug = require('debug');
const fs = require('fs');
const _ = require('lodash');

async function fileHandler(extentions, watchedDir, filePath, event = null) {
  const fullFilename = path.basename(filePath);
  const extentionName = path.extname(fullFilename);
  const found = _.find(extentions, (x) => x.ext === extentionName);
  if (found) {
    const distDir = `${watchedDir}/${found.folder_name}/${fullFilename}`;
    moveFile(filePath, distDir).then(() => {
      debug.log(`${distDir} ✔️`);
    }).catch(() => {
      setTimeout(async () => {
        try {
          await moveFile(filePath, `${distDir}`);
          debug.log(`${distDir} ✔️`);
        } catch (e) {
          debug.log(`${distDir} ❌`);
        }
      }, 10000);
    });
  }
  // you can pass close handler
}

async function oneTimeScan(extentions, watchedDir) {
  fs.readdir(watchedDir, (err, files) => {
    if (err) {
      return debug.log(' Error In Reading Directory');
    }
    files.forEach((file) => {
      const filePath = `${watchedDir}/${file}`;
      fileHandler(extentions, watchedDir, filePath);
    });
    return null;
  });
}

module.exports = {
  fileHandler,
  oneTimeScan,
};
