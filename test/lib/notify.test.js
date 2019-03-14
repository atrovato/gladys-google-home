const proxyquire = require('proxyquire');
const chai = require('chai');
const assert = chai.assert;
const Promise = require('bluebird');

let initState = false;
const libMock = function (sentence) {
  initState = true;
  return Promise.resolve(sentence);
};

var notify = proxyquire('../../lib/notify.js', {
  './say.js': libMock
});

describe('Gladys module notify', function () {

  let notification;
  let house;
  let user;

  beforeEach(() => {
    notification = {
      text: 'TEXT TO SAY'
    };
    house = {
      id: 'HOUSE_ID',
      name: 'HOUSE NAME'
    };
    user = {
      id: 'USER_ID',
      firstname: 'USER NAME',
      language: 'fr'
    };
  });

  it('Gladys fail with GetMyHouse', (done) => {
    gladys = {
      machine: {
        getMyHouse: () => {
          return Promise.reject('ERROR getMyHouse');
        }
      }
    };

    notify(notification, user)
      .then((e) => {
        done('Should have fail ' + e);
      }).catch((e) => {
        assert.equal(e, 'ERROR getMyHouse', 'Invalid result');
        assert.isNotOk(initState, 'Should not have been say');

        done();
      });
  });

  it('Gladys fail with isUserAtHome', (done) => {
    gladys = {
      machine: {
        getMyHouse: () => {
          return Promise.resolve(house);
        }
      },
      house: {
        isUserAtHome: () => {
          return Promise.reject('ERROR isUserAtHome');
        }
      }
    };

    notify(notification, user)
      .then((e) => {
        done('Should have fail ' + e);
      }).catch((e) => {
        assert.equal(e, 'ERROR isUserAtHome', 'Invalid result');
        assert.isNotOk(initState, 'Should not have been say');

        done();
      });
  });

  it('Gladys user not at home', (done) => {
    gladys = {
      machine: {
        getMyHouse: () => {
          return Promise.resolve(house);
        }
      },
      house: {
        isUserAtHome: () => {
          return Promise.resolve(false);
        }
      }
    };

    notify(notification, user)
      .then((e) => {
        done('Should have fail ' + e);
      }).catch((e) => {
        assert.equal(e, `User ${user.firstname} not at home`, 'Invalid result');
        assert.isNotOk(initState, 'Should not have been say');

        done();
      });
  });

  it('Gladys talks using Google Home', (done) => {
    gladys = {
      machine: {
        getMyHouse: () => {
          return Promise.resolve(house);
        }
      },
      house: {
        isUserAtHome: () => {
          return Promise.resolve(true);
        }
      }
    };

    notify(notification, user)
      .then((e) => {
        assert.isOk(initState, 'Should have been say');
        assert.deepEqual(e, { text: notification.text, language: user.language });
        done();
      }).catch((e) => {
        done('Should have fail ' + e);
      });
  });
});