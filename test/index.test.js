const proxyquire = require('proxyquire');
const chai = require('chai');
const assert = chai.assert;

const EventEmitter = require('events');

let initState = false;
const libMock = function () {
  return 'NO LIB';
};
const initMock = function () {
  initState = true;
};

var index = proxyquire('../index.js', {
  './lib/say.js': libMock,
  './lib/notify.js': libMock,
  './lib/setup.js': libMock,
  './lib/init.js': initMock
});

describe('Gladys module index', function () {

  let expectedResult;

  beforeEach(() => {
    gladys = new EventEmitter();
    expectedResult = {
      say: libMock,
      setup: libMock,
      notify: libMock
    };
  });

  it('Gladys is not ready', (done) => {
    const result = index(null);

    assert.isNotOk(initState, 'Should not have been initialized');
    assert.deepEqual(result, expectedResult, 'nvalid result');
    done();
  });

  it('Gladys is ready', (done) => {
    const result = index(null);
    gladys.emit('ready');

    assert.isOk(initState, 'Should not have been initialized');
    assert.deepEqual(result, expectedResult, 'nvalid result');
    done();
  });
});