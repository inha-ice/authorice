const service = require('../services/users');
const BadRequestError = require('../errors/BadRequestError');

const { NODE_ENV } = process.env;

const isUserId = (text) => /^\d{8}$/.test(text);
const isUserName = (text) => typeof text === 'string' && text.length <= 50;
const isPassword = (text) => typeof text === 'string';

const COOKIE_OPTIONS = {
  httpOnly: true,
};

if (NODE_ENV === 'production') {
  COOKIE_OPTIONS.secure = true;
}

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * @throws {BadRequestError} 유효하지 않은 입력
 * @throws {BadRequestError} 중복 가입
 * @throws {TokenSignError} JWT 생성 실패
 */
const createUser = async (req, res) => {
  const { id, name, password } = req.body;
  if (id && isUserId(id) && name && isUserName(name) && password && isPassword(password)) {
    const data = { id, name, password };
    const token = await service.createUser(data);
    res.cookie('access_token', token, COOKIE_OPTIONS);
    res.json({ message: 'success', token });
  } else {
    throw new BadRequestError('The required data is missing');
  }
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
  res.json({
    message: 'success',
    user: {
      id: user.id,
      name: user.name,
      nameEnglish: user.nameEnglish,
      level: user.level,
      email: user.email,
      phone: user.phone,
      picture: user.picture,
    },
  });
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
 */
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await service.getUser(id);
  res.json({ message: 'success', user });
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
    res.cookie('access_token', token, COOKIE_OPTIONS);
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
  getUser,
  login,
  updateMe,
  updateMyPrivacy,
};
