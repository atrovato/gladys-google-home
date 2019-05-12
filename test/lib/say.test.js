const proxyquire = require('proxyquire');
const chai = require('chai');
const assert = chai.assert;

const expectedText = 'TEXT';
const expectedLang = 'FR';

let queued = false;
let started = false;
let talk = false;
let googleHome;
let startStatus = false;

const libMock = {
  queue: {
    push: (callback) => {
      queued = true;
      callback(() => {});
    },
    start: (callback) => {
      started = true;
      callback(startStatus);
    }
  },
  google_home: googleHome
};

var say = proxyquire('../../lib/say.js', {
  './shared.js': libMock
});

describe('Gladys module say', function () {

  let params;

  beforeEach(() => {
    queued = false;
    started = false;
    talk = false;
    startStatus = false;

    params = {
      text: expectedText,
      language: expectedLang
    };
  });

  it('Google Home not initialized', (done) => {
    say(params)
      .then((e) => {
        done('Should have fail ' + e);
      }).catch((e) => {
        assert.equal(e, 'Google Home not initialized', 'Invalid result');
        assert.isNotOk(queued, 'Should not have been queued');
        assert.isNotOk(started, 'Should not have been started');
        assert.isNotOk(talk, 'Should not have talk');

        done();
      });
  });

  it('Google Home initialized', (done) => {
    libMock.google_home = {
      say: (text, lang) => {
        talk = true;
        assert.equal(text, expectedText, 'Invalid text');
        assert.equal(lang, expectedLang, 'Invalid lang');
        return Promise.resolve();
      }
    };

    say(params)
      .then((e) => {
        assert.isOk(queued, 'Should have been queued');
        assert.isOk(started, 'Should have been started');
        assert.isOk(talk, 'Should have talk');

        done();
      }).catch((e) => {
        done('Should not have fail ' + e);
      });
  });

  it('Google Home start error', (done) => {
    startStatus = true;

    libMock.google_home = {
      say: (text, lang) => {
        talk = true;
        assert.equal(text, expectedText, 'Invalid text');
        assert.equal(lang, expectedLang, 'Invalid lang');
        return Promise.resolve();
      }
    };

    say(params)
      .then((e) => {
        done('Should have fail ' + e);
      }).catch((e) => {
        assert.isOk(queued, 'Should have been queued');
        assert.isOk(started, 'Should have been started');
        assert.isOk(talk, 'Should have talk');

        done();
      });
  });
});
