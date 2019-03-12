const say = require('./lib/say.js');
const notify = require('./lib/notify.js');
const setup = require('./lib/setup.js');
const init = require('./lib/init.js');

module.exports = function () {
  gladys.on('ready', function () {
    init();
  });

  return {
    say: say,
    notify: notify,
    setup: setup
  };
};