const InternalServerError = require('./InternalServerError');

class TokenSignError extends InternalServerError {
  constructor(message) {
    super(message);
    this.name = 'TokenSignError';
  }
}

module.exports = TokenSignError;
