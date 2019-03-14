const say = require('./say.js');
const Promise = require('bluebird');

/**
 * Notify the user ONLY if he is at home (logical)
 */
module.exports = function (notification, user) {
  return gladys.machine.getMyHouse()
    .then((house) => {
      return gladys.house.isUserAtHome({ user: user.id, house: house.id });
    })
    .then((userAtHome) => {
      if (!userAtHome) {
        return Promise.reject(`User ${user.firstname} not at home`);
      }

      return say({ language: user.language.substr(0, 2).toLowerCase(), text: notification.text });
    });
};