const moveFile = require('move-file');
const path = require('path');
const debug = require('debug');
const fs = require('fs');
const _ = require('lodash');
const { each } = require('async');

async function fileHandler(extentions, watchedDir, filePath, event = null) {
  const fullFilename = path.basename(filePath);
  const extentionName = path.extname(fullFilename);
  const found = _.find(extentions, (x) => x.ext === extentionName);
  if (found) {
    const distDir = `${watchedDir}/${found.folder_name}/${fullFilename}`;
    moveFile(filePath, distDir).then(() => {
      // if (c) c(`${filePath} ✔️`);
    }).catch(() => {
      setTimeout(async () => {
        try {
          await moveFile(filePath, `${distDir}`);
        } catch (e) {
          // if (c) c(`${filePath} ❌`);
        }
      }, 10000);
    });
  }
  // you can pass close handler
}

async function oneTimeScan(extentions, watchedDir, c = null) {
  fs.readdir(watchedDir, (err, files) => {
    if (err) {
      return debug.log(' Error In Reading Directory');
    }
    if (files.length === 0) {
      c([], watchedDir);
    } else {
      let filesProcessed = 1;
      const onlyFiles = [];
      each(files, (file, callback) => {
        const filePath = `${watchedDir}/${file}`;
        if (fs.lstatSync(filePath).isFile()) {
          onlyFiles.push(file);
          fileHandler(
            extentions,
            watchedDir,
            filePath,
            null,
          );
        }
        if (filesProcessed === files.length && c) c(onlyFiles, watchedDir);
        filesProcessed += 1;
        callback();
      });
    }
    return null;
  });
}

module.exports = {
  fileHandler,
  oneTimeScan,
};
