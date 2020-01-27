const assert = require('assert');
const request = require('supertest');
const profile = require('./profile');
const app = require('../src/app');
const { hasErrorMessage, isSuccessMessage } = require('../src/utils/responses');
const tester = require('../src/utils/tester');

let userAgent;

describe('route:auth', () => {
  before(async () => {
    userAgent = await tester.login(profile.id, profile.password);
  });

  context('POST /auth', () => {
    it('로그인 성공', (done) => {
      request(app)
        .post('/auth')
        .expect(200)
        .send({ id: profile.id, password: profile.password })
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(typeof body.token === 'string');
            done();
          }
        });
    });

    it('로그인 실패: 유효하지 않은 입력', (done) => {
      request(app)
        .post('/auth')
        .send({})
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('로그인 실패: 존재하지 않는 사용자', (done) => {
      request(app)
        .post('/auth')
        .send({ id: '00000000', password: '1q2w3e4r!' })
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /auth/me', () => {
    it('내 정보 조회 성공', (done) => {
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

    it('내 정보 조회 실패: 인증없음', (done) => {
      request(app)
        .get('/auth/me')
        .expect(401)
        .end(hasErrorMessage(done));
    });
  });

  context('PATCH /auth/me', () => {
    it('내 정보 수정 성공', (done) => {
      userAgent
        .patch('/auth/me')
        .send({ phone: '010-1234-5678' })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('내 정보 수정 실패: 인증없음', (done) => {
      request(app)
        .patch('/auth/me')
        .send({ phone: '010-1234-5678' })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('내 정보 수정 실패: 유효하지 않은 입력', (done) => {
      userAgent
        .patch('/auth/me')
        .send({ phone: 'abc-defg-hijk' })
        .expect(400)
        .end(hasErrorMessage(done));
    });
  });

  context('DELETE /auth/me', () => {
    it('회원탈퇴 성공', (done) => {
      tester
        .signUp('44444444', 'temp', 'will_be_gone')
        .then((tempAgent) => {
          tempAgent
            .delete('/auth/me')
            .expect(200)
            .end(isSuccessMessage(done));
        });
    });

    it('회원탈퇴 실패: 인증없음', (done) => {
      request(app)
        .delete('/auth/me')
        .expect(401)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /auth/me/logs', () => {
    it('내 로그 조회 성공', (done) => {
      userAgent
        .get('/auth/me/logs')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(Array.isArray(body.logs));
            const { logs } = body;
            logs.forEach((log) => {
              assert(typeof log.id === 'number');
              assert(typeof log.action === 'string');
              assert(typeof log.createdAt === 'string');
            });
            done();
          }
        });
    });

    it('내 로그 조회 실패: 인증없음', (done) => {
      request(app)
        .get('/auth/me/logs')
        .expect(401)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /auth/me/privacy', () => {
    it('내 정보공개설정 조회 성공', (done) => {
      userAgent
        .get('/auth/me/privacy')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(typeof body.privacy === 'object');
            const { privacy } = body;
            assert(typeof privacy.name === 'boolean');
            assert(typeof privacy.nameEnglish === 'boolean');
            assert(typeof privacy.level === 'boolean');
            assert(typeof privacy.email === 'boolean');
            assert(typeof privacy.phone === 'boolean');
            assert(typeof privacy.picture === 'boolean');
            done();
          }
        });
    });
  });

  context('PATCH /auth/me/privacy', () => {
    it('내 정보공개설정 수정 성공', (done) => {
      userAgent
        .patch('/auth/me/privacy')
        .send({ name: false })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('내 정보공개설정 수정 실패: 인증없음', (done) => {
      request(app)
        .patch('/auth/me/privacy')
        .send({ name: false })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('내 정보공개설정 수정 실패: 유효하지 않은 입력', (done) => {
      userAgent
        .patch('/auth/me/privacy')
        .send({ name: 'no' })
        .expect(400)
        .end(hasErrorMessage(done));
    });
  });
});
