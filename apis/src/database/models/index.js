const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const User = require('./User');
const UserPrivacy = require('./UserPrivacy');
const UserSecurityLog = require('./UserSecurityLog');

dotenv.config();

const {
  NODE_ENV,
  MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD,
} = process.env;

const SEQUELIZE_COMMON_OPTIONS = {
  define: { underscored: true },
};

if (NODE_ENV !== 'development') {
  SEQUELIZE_COMMON_OPTIONS.logging = false;
}

const SEQUELIZE_MYSQL_OPTIONS = {
  database: MYSQL_DATABASE,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
};

const sequelize = (NODE_ENV === 'test')
  ? new Sequelize('sqlite::memory:', SEQUELIZE_COMMON_OPTIONS)
  : new Sequelize(Object.assign(SEQUELIZE_COMMON_OPTIONS, SEQUELIZE_MYSQL_OPTIONS));

const db = {
  User: User(sequelize, Sequelize),
  UserPrivacy: UserPrivacy(sequelize, Sequelize),
  UserSecurityLog: UserSecurityLog(sequelize, Sequelize),
  Sequelize,
  sequelize,
};

Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

module.exports = db;
