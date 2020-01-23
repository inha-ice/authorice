const assert = require('assert');
const request = require('supertest');
const profile = require('./profile');
const app = require('../app');
const { hasErrorMessage } = require('../utils/responses');
const tester = require('../utils/tester');

let userAgent;

describe('route:auth', () => {
  before(async () => {
    userAgent = await tester.login(profile.id, profile.password);
  });

  context('GET /me', () => {
    it('내 정보 가져오기 성공', (done) => {
      userAgent
        .get('/auth/me')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(typeof body.user === 'object');
            const { user } = body;
            assert(typeof user.id === 'number');
            assert(typeof user.name === 'string' || user.name === null);
            assert(typeof user.nameEnglish === 'string' || user.nameEnglish === null);
            assert(typeof user.level === 'number' || user.level === null);
            assert(typeof user.email === 'string' || user.email === null);
            assert(typeof user.phone === 'string' || user.phone === null);
            assert(typeof user.picture === 'string' || user.picture === null);
            done();
          }
        });
    });

    it('내 정보 가져오기 실패: 인증없음', (done) => {
      request(app)
        .get('/auth/me')
        .expect(401)
        .end(hasErrorMessage(done));
    });
  });
});
