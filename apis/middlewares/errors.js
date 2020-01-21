/* eslint-disable consistent-return */
const ResponseError = require('../errors/ResponseError');

const errors = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ResponseError) {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      status: statusCode,
      message,
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

module.exports = errors;
