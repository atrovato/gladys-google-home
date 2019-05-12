const proxyquire = require('proxyquire');
const chai = require('chai');
const assert = chai.assert;
const Promise = require('bluebird');

const shared = require('../../lib/shared.js');

let initState = false;
const libMock = function (ip) {
  initState = true;
  return ip;
};

var init = proxyquire('../../lib/init.js', {
  'google-home-player': libMock
});

describe('Gladys module init', function () {

  let expectedResult;
  let paramIP;
  let paramRequested;

  beforeEach(() => {
    paramRequested = undefined;
    paramIP = 'MY-IP';
    expectedResult = 'Google Home initialized';
  });

  it('Gladys fail with param', (done) => {
    gladys = {
      param: {
        getValue: (param) => {
          paramRequested = param;
          return Promise.reject(paramIP);
        }
      }
    };

    init(null)
      .then((e) => {
        done('Should have fail ' + e);
      }).catch((e) => {
        assert.equal(e, paramIP, 'Invalid result');
        assert.equal(paramRequested, 'GOOGLE_HOME_IP', 'Invalid param');
        assert.isNotOk(initState, 'Should not have been initialized');
        assert.isNotOk(shared.google_homes, 'GoogleHome should not have been initialized');

        done();
      });
  });

  it('Gladys success with param', (done) => {
    gladys = {
      param: {
        getValue: (param) => {
          paramRequested = param;
          return Promise.resolve(paramIP);
        }
      }
    };

    init()
      .then((e) => {
        assert.equal(e, expectedResult, 'Invalid result');
        assert.equal(paramRequested, 'GOOGLE_HOME_IP', 'Invalid param');
        assert.isOk(initState, 'Should have been initialized');
        assert.isOk(shared.google_homes, 'GoogleHome should have been initialized');

        done();
      }).catch((e) => {
        done('Should not have fail ' + e);
      });
  });
});
