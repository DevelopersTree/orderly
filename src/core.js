const moveFile = require('move-file');
const path = require('path');
const debug = require('debug');
const _ = require('lodash');

async function organize(extentions, watchedDir, filePath, event) {
  const fullFilename = path.basename(filePath);
  const extentionName = path.extname(fullFilename);
  const found = _.find(extentions, (x) => {
    return x.ext === extentionName;
  });
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

module.exports = {
  organize,
};
