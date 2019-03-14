const queue = require('queue');
const q = queue({
  concurrency: 1
});
q.start(function (err) {
  if (err) {
    console.error('Google-Home module: ' + err);
  }
});

module.exports = {
  queue: q
};