const assert = require('assert');
const request = require('supertest');
const app = require('../app');

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