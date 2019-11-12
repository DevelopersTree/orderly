// const { exists } = require('linux-systemd');
const debug = require('debug');
const { exec } = require('child_process');

const serviceName = 'orderly';
function startServiceLinux(onSuccess = null, onError = null) {
  const shellCommand = `
    sudo npx service-systemd -a -n ${serviceName}  -c ${__dirname}  -A service.js
    systemctl start ${serviceName}
    `;
  exec(shellCommand, (err, stdout, stderr) => {
    if (err) {
      if (onError) onError(err, stdout, stderr);
      if (stderr.trim() === '' && onSuccess) onSuccess(stdout, stderr);
      return null;
    }
    if (stderr.trim() === '' && onSuccess) onSuccess(stdout, stderr);
    return null;
  });
}

function stopServiceLinux(onSuccess = null, onError = null) {
  const shellCommand = `
    sudo npx service-systemd -r -n ${serviceName}
    systemctl stop ${serviceName}
    `;
  exec(shellCommand, (err, stdout, stderr) => {
    if (err) {
      if (onError) onError(err, stdout, stderr);
      if (stderr.trim() === '' && onSuccess) onSuccess(stdout, stderr);
      return null;
    }
    if (stderr.trim() === '' && onSuccess) onSuccess(stdout, stderr);
    return null;
  });
}
function reloadServiceLinux(onSuccess = null, onError = null) {
  const shellCommand = `
    systemctl restart ${serviceName}
    `;
  exec(shellCommand, (err, stdout, stderr) => {
    if (err) {
      if (onError) onError(err, stdout, stderr);
      if (stderr.trim() === '' && onSuccess) onSuccess(stdout, stderr);
      return null;
    }
    if (stderr.trim() === '' && onSuccess) onSuccess(stdout, stderr);
    return null;
  });
}

async function startService(onSuccess = null, onError = null) {
  debug.log(`starting  ${serviceName} service ....`);
  startServiceLinux(onSuccess, onError);
}


function stopService(onSuccess = null, onError = null) {
  debug.log(`stoping ${serviceName} service...`);
  stopServiceLinux(onSuccess, onError);
}
function reloadService(onSuccess = null, onError = null) {
  debug.log(`restarting ${serviceName} service...`);
  reloadServiceLinux(onSuccess, onError);
}


module.exports = {
  startService,
  stopService,
  reloadService,
};
