const queue = require('queue');
const q = queue({
  concurrency: 1
});
q.start(function (err) {
  console.log(err);
});

module.exports = {
  queue: q
};