const shared = require('./shared.js');
const Promise = require('bluebird');

module.exports = function(params) {
     return new Promise((resolve, reject) => {
          if (shared.google_homes) {
               let devices = [];
               if (params.devices) {
                    const idDevices = params.devices.split(',');
                    for (idDevice of idDevices) {
                         devices.push(shared.google_homes[idDevice])
                    }
               } else {
                    devices = shared.google_homes
               }

               for (device of devices) {
                    shared.queue.push((cb) => {
                         device.say(params.text, params.language)
                              .then(function(){
                                   cb();
                              });
                    });
                    shared.queue.start(function(err) {
                         if (err) {
                              return reject(err);
                         }
                    });
               }
               return resolve(params);
          } else {
               return reject('Google Home(s) not initialized');
          }
     });
};
