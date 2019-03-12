const shared = require('./shared.js');
const GoogleHomePlayer = require('google-home-player');

module.exports = function () {
  return gladys.param.getValue('GOOGLE_HOME_IP')
    .then((ip) => {
      shared.google_home = new GoogleHomePlayer(ip);
      return shared.google_home.say('Gladys can talk now');
    });
};