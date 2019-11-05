const moveFile = require('move-file');
const path = require('path');
const debug = require('debug');
const fs = require('fs');
const _ = require('lodash');
const { each } = require('async');

async function fileHandler(extentions, selectedDir, filePath, event = null) {
  const fullFilename = path.basename(filePath);
  const extentionName = path.extname(fullFilename);
  const found = _.find(extentions, (x) => x.ext === extentionName);
  if (found) {
    const distDir = `${selectedDir}/${found.folder_name}/${fullFilename}`;
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

function readAndScan(extentions, dir, c) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return debug.log(`❌ ❌ ❌ Error In Reading Directory "${dir}"❌ ❌ ❌ `);
    }
    debug.log(`directory "${dir}" loaded  ✔️`);
    if (files.length === 0 && c) {
      c([], dir);
    } else {
      let filesProcessed = 1;
      const onlyFiles = [];
      each(files, (file, callback) => {
        const filePath = `${dir}/${file}`;
        if (fs.lstatSync(filePath).isFile()) {
          onlyFiles.push(file);
          fileHandler(
            extentions,
            dir,
            filePath,
            null,
          );
        }
        if (filesProcessed === files.length && c) c(onlyFiles, dir);
        filesProcessed += 1;
        callback();
      });
    }
    return null;
  });
}


async function oneTimeScan(extentions, watchedDir, c = null) {
  if (Array.isArray(watchedDir)) {
    watchedDir.forEach((dir) => {
      readAndScan(extentions, dir, c);
    });
  } else {
    readAndScan(extentions, watchedDir, c);
  }
}


module.exports = {
  fileHandler,
  oneTimeScan,
};
