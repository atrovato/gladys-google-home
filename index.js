const say = require('./lib/say.js');
const notify = require('./lib/notify.js');
const setup = require('./lib/setup.js');

module.exports = function () {
  return {
    say: say,
    notify: notify,
    setup: setup
  };
};