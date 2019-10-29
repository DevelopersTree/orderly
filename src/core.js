const moveFile = require('move-file');
const path = require('path');
const debug = require('debug');

async function organize(watchedDir, filePath, event) {
  const fullFilename = path.basename(filePath);
  moveFile(filePath, `${watchedDir}/here/${fullFilename}`).then(() => {
    debug.log(`${watchedDir}/here/${fullFilename} ✔️`);
  }).catch(() => {
    setTimeout(async () => {
      try {
        await moveFile(filePath, `${watchedDir}/here/${fullFilename}`);
        debug.log(`${watchedDir}/here/${fullFilename} ✔️`);
      } catch (e) {
        debug.log(`${watchedDir}/here/${fullFilename} ❌`);
      }
    }, 10000);
  });
}

module.exports = {
  organize,
};
