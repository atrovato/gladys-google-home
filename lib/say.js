const shared = require('./shared.js');
const Promise = require('bluebird');

module.exports = function (params) {
  return new Promise((resolve, reject) => {
    if (shared.google_homes) {
      shared.queue.push((cb) => {
        for (sGH of shared.google_homes) {
          sGH.say(params.text, params.language)
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
