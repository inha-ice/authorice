const UnauthorizedError = require('../errors/UnauthorizedError');
const userService = require('../services/users');
const { extractTokenFromCookie, extractTokenFromHeader, verifyToken } = require('../utils/jwt');

/**
 * 쿠키 또는 헤더에 유효한 JWT가 포함되어있는지 확인합니다.
 * @param {Request} req
 * @param {?Response} _
 * @param {Function} next
 */
const verifyAuth = (req, _, next) => {
  const token = extractTokenFromCookie(req) || extractTokenFromHeader(req);
  if (token) {
    verifyToken(token)
      .then((payload) => userService.getUser(payload.id))
      .then((user) => {
        req.user = user;
        next();
      }).catch(next);
  } else {
    next(new UnauthorizedError('Cannot find the token'));
  }
};

module.exports = { verifyAuth };
