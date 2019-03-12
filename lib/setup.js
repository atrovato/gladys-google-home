const init = require('./init.js');

module.exports = function () {
  return init()
    .then(() => {
      var type = {
        name: 'Google Home',
        service: 'google-home'
      };

      return gladys.notification.install(type);
    });
};