const shared = require('./shared.js');
const Promise = require('bluebird');

module.exports = function (params) {
  return new Promise((resolve, reject) => {
    if (shared.google_home) {
      shared.queue.push((cb) => {
        shared.google_home.say(params.text, params.language)
          .then(() => {
            cb();
          });
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