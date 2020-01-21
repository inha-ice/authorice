const service = require('../services/users');
const BadRequestError = require('../errors/BadRequestError');

const isUserId = (text) => /^\d{8}$/.test(text);
const isPassword = (text) => typeof text === 'string';

const createUser = async (req, res) => {
  const { id, password } = req.body;
  const data = { id, password };
  await service.createUser(data);
  res.json({ message: 'success' });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const deleteMe = async (req, res) => {
  const { user } = req;
  await service.deleteUser(user);
  res.json({ message: 'success' });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const getMe = async (req, res) => {
  const { user } = req;
  res.json({ message: 'success', user });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const getMyLogs = async (req, res) => {
  const { user } = req;
  const logs = await service.getUserLogs(user);
  res.json({ message: 'success', logs });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const getMyPrivacy = async (req, res) => {
  const { user } = req;
  const privacy = await service.getUserPrivacy(user);
  res.json({ message: 'success', privacy });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * @throws {BadRequestError} 유효하지 않은 입력
 * @throws {NotFoundError} 로그인 실패
 * @throws {TokenSignError} JWT 생성 실패
 * @throws {NotFoundError} 존재하지 않는 사용자
 */
const login = async (req, res) => {
  const { id, password } = req.body;
  if (id && isUserId(id) && password && isPassword(password)) {
    const token = await service.login(id, password);
    res.cookie('access_token', `Baerer ${token}`, { httpOnly: true, secure: true, sameSite: true });
    res.json({ message: 'success', token });
  } else {
    throw new BadRequestError('The given id or password is invalid');
  }
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * @throws {BadRequestError}
 */
const updateMe = async (req, res) => {
  const { user } = req;
  const { email } = req.body;
  const data = { email };
  await service.updateUser(user, data);
  res.json({ message: 'success' });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * @throws {BadRequestError}
 */
const updateMyPrivacy = async (req, res) => {
  const { user } = req;
  const { email } = req.body;
  const visiblities = { email };
  await service.updateUserPrivacy(user, visiblities);
  res.json({ message: 'success' });
};

module.exports = {
  createUser,
  deleteMe,
  getMe,
  getMyLogs,
  getMyPrivacy,
  login,
  updateMe,
  updateMyPrivacy,
};
