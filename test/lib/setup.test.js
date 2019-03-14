const proxyquire = require('proxyquire');
const chai = require('chai');
const assert = chai.assert;
const Promise = require('bluebird');

let initFail = false;
let installNotif = false;

const libMock = () => {
  if (initFail) {
    return Promise.reject('INIT FAIL');
  } else {
    return Promise.resolve('INIT SUCCESS');
  }
};

var setup = proxyquire('../../lib/setup.js', {
  './init.js': libMock
});

describe('Google Home module setup', function () {

  beforeEach(() => {
    initFail = false;
    installNotif = false;
  });

  it('Google Home fail init', (done) => {
    initFail = true;

    setup().then((e) => {
      done('Should have fail ' + e);
    }).catch((e) => {
      assert.equal(e, 'INIT FAIL', 'Invalid result');
      assert.isNotOk(installNotif, 'Notification should not have been installed');

      done();
    });
  });

  it('Google Home success init', (done) => {
    gladys = {
      notification: {
        install: (params) => {
          installNotif = true;
          return Promise.resolve(params);
        }
      }
    };

    const expectedResult = {
      name: 'Google Home',
      service: 'google-home'
    };

    setup().then((e) => {
      assert.isOk(installNotif, 'Notification should not have been installed');
      assert.deepEqual(e, expectedResult, 'Invalid result');

      done();
    }).catch((e) => {
      done('Should not have fail ' + e);
    });
  });
});