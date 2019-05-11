const shared = require('./shared.js');
const Promise = require('bluebird');

module.exports = function (params) {
  return new Promise((resolve, reject) => {
    if (shared.google_homes) {
      let devices=[];

      shared.queue.push((cb) => {
        if(params.devices){
          if(params.devices.indexOf(',')!=-1){
            const idDevices=params.devices.split(',');
            for (idDevice of idDevices) {
              devices.push(shared.google_homes[idDevice])
            }
          }else{
            devices.push(shared.google_homes[params.devices])
          }
        }else{
          devices=shared.google_homes
        }

        for (device of devices) {
          device.say(params.text, params.language)
            .then(() => {
              cb();
            });
        }
      });
      shared.queue.start(function (err) {
        if (err) {
          return reject(err);
        }
      });
      return resolve(params);
    } else {
      return reject('Google Home not initialized');
    }
  });
};
