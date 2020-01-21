const UnauthorizedError = require('./UnauthorizedError');

class TokenVerifyError extends UnauthorizedError {
  constructor(message) {
    super(message);
    this.name = 'TokenVerifyError';
  }
}

module.exports = TokenVerifyError;
