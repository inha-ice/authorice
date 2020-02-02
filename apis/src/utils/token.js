const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const TokenSignError = require('../errors/TokenSignError');
const TokenVerifyError = require('../errors/TokenVerifyError');

dotenv.config();

const {
  JWT_EXPIRED = '1d',
  JWT_ISSUER = 'issuer',
  JWT_SECRET = 'secret',
} = process.env;
const JWT_OPTIONS = { expiresIn: JWT_EXPIRED, issuer: JWT_ISSUER };
const SCHEMA_REGEX = /^(?:Bearer )?([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)$/;

/**
 * 쿠키에서 access_token 값을 가져옵니다.
 * @param {Request} req
 * @returns {?string} 토큰
 */
const extractTokenFromCookie = (req) => {
  const schema = req.cookies && req.cookies.access_token; // optional chaining
  if (schema && SCHEMA_REGEX.test(schema)) {
    const [, token] = SCHEMA_REGEX.exec(schema);
    return token;
  }
  return null;
};

/**
 * Authorization 헤더에서 Bearer 인증스킴 형태의 토큰을 가져옵니다.
 * @param {Request} req
 * @returns {?string} 토큰
 */
const extractTokenFromHeader = (req) => {
  const schema = req.header('Authorization');
  if (schema && SCHEMA_REGEX.test(schema)) {
    const [, token] = SCHEMA_REGEX.exec(schema);
    return token;
  }
  return null;
};

/**
 * 토큰을 만들어 반환합니다.
 * @async
 * @param {Object} payload
 * @returns {Promise.<string>} 토큰
 * @throws {TokenSignError} 토큰 생성 실패
 */
const signToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, JWT_SECRET, JWT_OPTIONS, (err, token) => {
    if (err) {
      reject(new TokenSignError('Cannot create the token'));
    } else {
      resolve(token);
    }
  });
});

/**
 * 토큰의 무결성을 확인하고 토큰 정보를 반환합니다.
 * @async
 * @param {string} token
 * @returns {Promise.<Object>} 토큰 정보
 * @throws {TokenVerifyError} 토큰 인증 실패
 */
const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, JWT_SECRET, JWT_OPTIONS, (err, payload) => {
    if (err) {
      reject(new TokenVerifyError('Invalid token found'));
    } else {
      resolve(payload);
    }
  });
});

module.exports = {
  extractTokenFromCookie,
  extractTokenFromHeader,
  signToken,
  verifyToken,
};
