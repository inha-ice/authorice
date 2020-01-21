/**
 * @param {Function} asyncFn
 * @returns {Function}
 */
const handleAsync = (asyncFn) => async (req, res, next) => { // 일반 함수를 input으로 받으면 비동기식으로 바꾼다.
  try {
    return await asyncFn(req, res, next);
  } catch (e) {
    return next(e);
  }
};

module.exports = { handleAsync };
