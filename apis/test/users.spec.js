const assert = require('assert');
const request = require('supertest');
const profiles = require('./profiles');
const app = require('../src/app');
const { hasErrorMessage, isSuccessMessage } = require('../src/utils/responses');
const tester = require('../src/utils/tester');

let managerAgent;
let userAgent;

describe('route:users', () => {
  before(async () => {
    managerAgent = await tester.login(profiles.manager.id, profiles.manager.password);
    userAgent = await tester.login(profiles.user.id, profiles.user.password);
  });

  context('POST /users', () => {
    it('가입 성공', (done) => {
      request(app)
        .post('/users')
        .expect(200)
        .send({ id: '77777777', name: '테스터', password: 'test_sign_up' })
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

    it('가입 실패: 유효하지 않은 입력', (done) => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('가입 실패: 중복 가입', (done) => {
      request(app)
        .post('/users')
        .send({ id: '77777777', name: '테스터', password: 'test_sign_up_duplicate' })
        .expect(400)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /users', () => {
    it('모든 사용자 정보 조회 성공', (done) => {
      managerAgent
        .get('/users')
        .expect(200)
        .end((err, res) => {
          if (err) {
            assert.fail(err);
          } else {
            const { body } = res;
            assert(body.message === 'success');
            assert(Array.isArray(body.users));
            const { users } = body;
            users.forEach((user) => {
              assert(typeof user.id === 'number');
              assert(typeof user.name === 'string' || user.name === null);
              assert(typeof user.nameEnglish === 'string' || user.nameEnglish === null);
              assert(typeof user.level === 'number' || user.level === null);
              assert(typeof user.email === 'string' || user.email === null);
              assert(typeof user.phone === 'string' || user.phone === null);
              assert(typeof user.picture === 'string' || user.picture === null);
            });
            done();
          }
        });
    });

    it('모든 사용자 정보 조회 실패: 인증없음', (done) => {
      request(app)
        .get('/users')
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('모든 사용자 정보 조회 실패: 권한없음', (done) => {
      userAgent
        .get('/users')
        .expect(403)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /users/:id', () => {
    it('사용자 정보 조회 성공', (done) => {
      managerAgent
        .get(`/users/${profiles.user.id}`)
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

    it('사용자 정보 조회 실패: 인증없음', (done) => {
      request(app)
        .get(`/users/${profiles.user.id}`)
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사용자 정보 조회 실패: 권한없음', (done) => {
      userAgent
        .get(`/users/${profiles.user.id}`)
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사용자 정보 조회 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .get('/users/id')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사용자 정보 조회 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .get('/users/44444444')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('DELETE /users/:id', () => {
    it('사용자 강퇴 성공', (done) => {
      tester
        .signUp('44444444', '테스터', 'test_kick')
        .then(() => {
          managerAgent
            .delete('/users/44444444')
            .expect(200)
            .end(isSuccessMessage(done));
        });
    });

    it('사용자 강퇴 실패: 인증없음', (done) => {
      request(app)
        .delete(`/users/${profiles.user.id}`)
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사용자 강퇴 실패: 권한없음', (done) => {
      userAgent
        .delete(`/users/${profiles.user.id}`)
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사용자 강퇴 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .delete('/users/id')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사용자 정보 조회 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .get('/users/44444444')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('PUT /users/:id/level', () => {
    it('사용자 권한 수정 성공', (done) => {
      managerAgent
        .put(`/users/${profiles.user.id}/level`)
        .send({ level: 'MEMBER' })
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('사용자 권한 수정 실패: 인증없음', (done) => {
      request(app)
        .put(`/users/${profiles.user.id}/level`)
        .send({ level: 'MEMBER' })
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사용자 권한 수정 실패: 권한없음', (done) => {
      userAgent
        .put(`/users/${profiles.user.id}/level`)
        .send({ level: 'MEMBER' })
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사용자 권한 수정 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .put('/users/id/level')
        .send({ level: 'MEMBER' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사용자 권한 수정 실패: 유효하지 않은 권한', (done) => {
      managerAgent
        .put(`/users/${profiles.user.id}/level`)
        .send({ level: 'UNKNOWN' })
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사용자 권한 수정 조회 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .put('/users/44444444/level')
        .send({ level: 'MEMBER' })
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /users/:id/logs', () => {
    it('사용자 로그 조회 성공', (done) => {
      managerAgent
        .get(`/users/${profiles.user.id}/logs`)
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
              assert(typeof log.action === 'string');
              assert(typeof log.createdAt === 'string');
            });
            done();
          }
        });
    });

    it('사용자 로그 조회 실패: 인증없음', (done) => {
      request(app)
        .get(`/users/${profiles.user.id}/logs`)
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사용자 로그 조회 실패: 권한없음', (done) => {
      userAgent
        .get(`/users/${profiles.user.id}/logs`)
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사용자 로그 조회 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .get('/users/id/logs')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사용자 로그 조회 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .get('/users/44444444/logs')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('DELETE /users/:id/password', () => {
    it('사용자 비밀번호 초기화 성공', (done) => {
      managerAgent
        .delete(`/users/${profiles.user.id}/password`)
        .expect(200)
        .end(isSuccessMessage(done));
    });

    it('사용자 비밀번호 초기화 실패: 인증없음', (done) => {
      request(app)
        .delete(`/users/${profiles.user.id}/password`)
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사용자 비밀번호 초기화 실패: 권한없음', (done) => {
      userAgent
        .delete(`/users/${profiles.user.id}/password`)
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사용자 비밀번호 초기화 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .delete('/users/id/password')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사용자 비밀번호 초기화 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .delete('/users/44444444/password')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });

  context('GET /users/:id/privacy', () => {
    it('사용자 정보공개설정 조회 성공', (done) => {
      managerAgent
        .get(`/users/${profiles.user.id}/privacy`)
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

    it('사용자 정보공개설정 조회 실패: 인증없음', (done) => {
      request(app)
        .get(`/users/${profiles.user.id}/privacy`)
        .expect(401)
        .end(hasErrorMessage(done));
    });

    it('사용자 정보공개설정 조회 실패: 권한없음', (done) => {
      userAgent
        .get(`/users/${profiles.user.id}/privacy`)
        .expect(403)
        .end(hasErrorMessage(done));
    });

    it('사용자 정보공개설정 조회 실패: 유효하지 않은 아이디', (done) => {
      managerAgent
        .get('/users/id/privacy')
        .expect(400)
        .end(hasErrorMessage(done));
    });

    it('사용자 정보공개설정 조회 실패: 존재하지 않는 사용자', (done) => {
      managerAgent
        .get('/users/44444444/privacy')
        .expect(404)
        .end(hasErrorMessage(done));
    });
  });
});
