/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../app');
const Level = require('../constants/Level');
const userService = require('../services/users');

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

const signUpAsManager = async (id, name, password) => {
  const userAgent = await signUp(id, name, password);
  const user = await userService.getUser(id);
  await userService.updateUserLevel(user, Level.ADMIN, user);
  return userAgent;
};

module.exports = {
  login,
  signUp,
  signUpAsManager,
};
