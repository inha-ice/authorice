const assert = require('assert');
const request = require('supertest');
const profile = require('./profile');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');
const tester = require('../src/utils/tester');

before(async () => {
  await sequelize.sync();
  await tester.signUp(profile.id, profile.name, profile.password);
});

describe('route:index', () => {
  context('GET /ping', () => {
    it('Ping!', (done) => {
      request(app)
        .get('/ping')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done();
          } else {
            const { body } = res;
            assert(body.message === 'pong');
            done();
          }
        });
    });
  });

  context('GET /404', () => {
    it('Not Found!', (done) => {
      request(app)
        .get('/ping')
        .expect(404)
        .end((err, res) => {
          if (err) {
            done();
          } else {
            const { body } = res;
            assert(body.message === 'Not Found');
            done();
          }
        });
    });
  });
});
