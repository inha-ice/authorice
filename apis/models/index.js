const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const User = require('./User');
const UserPrivacy = require('./UserPrivacy');
const UserSecurityLogrityLog = require('./UserSecurityLog');

dotenv.config();

const {
  NODE_ENV,
  MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD,
} = process.env;

const SEQUELIZE_OPTIONS = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  logging: (NODE_ENV === 'development'),
};

const sequelize = (NODE_ENV === 'test')
  ? new Sequelize('sqlite::memory:')
  : new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, SEQUELIZE_OPTIONS);

module.exports = {
  User: User(sequelize, Sequelize),
  UserPrivacy: UserPrivacy(sequelize, Sequelize),
  UserSecurityLogrityLog: UserSecurityLogrityLog(sequelize, Sequelize),
  Sequelize,
  sequelize,
};
