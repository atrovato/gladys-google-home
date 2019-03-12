const shared = require('./shared.js');
const Promise = require('bluebird');

module.exports = function (params) {
  if (shared.google_home) {
    shared.queue.push((cb) => {
      shared.google_home.say(params.text, params.language)
        .then(() => {
          cb();
        });
    });
    return Promise.resolve(params);
  } else {
    return Promise.reject('Google Home not initialized');
  }
};