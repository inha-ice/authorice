const Level = require('../constants/Level');

const ID_REGEX = /^\d{8}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_NUMBER_REGEX = /^\d{2,3}-\d{3,4}-\d{4}$/;
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

const isLevel = (text) => typeof text === 'string' && text !== 'UNKNOWN' && text in Level;
const isEmail = (text) => EMAIL_REGEX.test(text) && text.length <= 200;
const isPhoneNumber = (text) => PHONE_NUMBER_REGEX.test(text);
const isUrl = (text) => URL_REGEX.test(text) && text.length <= 200;
const isUserId = (text) => ID_REGEX.test(text);
const isUserName = (text) => typeof text === 'string' && text.length >= 1 && text.length <= 50;
const isUserPassword = (text) => typeof text === 'string' && text.length >= 4 && text.length <= 200;

module.exports = {
  isLevel,
  isEmail,
  isPhoneNumber,
  isUrl,
  isUserId,
  isUserName,
  isUserPassword,
};
