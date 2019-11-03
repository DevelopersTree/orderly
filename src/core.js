const moveFile = require('move-file');
const path = require('path');
const debug = require('debug');
const fs = require('fs');
const _ = require('lodash');

async function fileHandler(extentions, watchedDir, filePath, event = null, c = null) {
  const fullFilename = path.basename(filePath);
  const extentionName = path.extname(fullFilename);
  const found = _.find(extentions, (x) => x.ext === extentionName);
  if (found) {
    const distDir = `${watchedDir}/${found.folder_name}/${fullFilename}`;
    moveFile(filePath, distDir).then(() => {
      if(c) c(`${filePath} ✔️`)
    }).catch(() => {
      setTimeout(async () => {
        try {
          await moveFile(filePath, `${distDir}`);
          if(c) c(`${filePath} ✔️`)
        } catch (e) {
          if(c) c(`${filePath} ❌`)
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
    files.forEach((file, index) => {
      const filePath = `${watchedDir}/${file}`;
      fileHandler(extentions, watchedDir, filePath, null, (statePath)=> c(files, index, statePath));
    });
    return null;
  });
}

module.exports = {
  fileHandler,
  oneTimeScan,
};
