class ResponseError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ResponseError';
  }
}

module.exports = ResponseError;
