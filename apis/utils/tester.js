/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../app');

const login = (id, password) => new Promise((resolve, reject) => {
  const userAgent = request.agent(app);
  userAgent
    .post('/auth')
    .send({ id, password })
    .end((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(userAgent);
      }
    });
});

const signUp = (id, name, password) => new Promise((resolve, reject) => {
  const userAgent = request.agent(app);
  userAgent
    .post('/users')
    .send({ id, name, password })
    .end((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(userAgent);
      }
    });
});

module.exports = {
  login,
  signUp,
};
