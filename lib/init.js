const shared = require('./shared.js');
const GoogleHomePlayer = require('google-home-player');

module.exports = function () {
  return gladys.param.getValue('GOOGLE_HOME_IP')
    .then((ip) => {
      shared.google_homes = [];
      const ips=ip.split(',');
      console.log(ips);
      for (ip of ips) {
        shared.google_homes.push(new GoogleHomePlayer(ip));
      }
      return Promise.resolve('Google Home initialized');
    });
};
