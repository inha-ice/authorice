const Level = require('../constants/Level');
const service = require('../services/users');
const BadRequestError = require('../errors/BadRequestError');

const { NODE_ENV } = process.env;

const ID_REGEX = /^\d{8}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_NUMBER_REGEX = /^\d{2,3}-\d{3,4}-\d{4}$/;

const isUserId = (text) => typeof text === 'string' && ID_REGEX.test(text);
const isUserName = (text) => typeof text === 'string' && text.length <= 50;
const isPassword = (text) => typeof text === 'string' && text.length >= 4;
const isEmail = (text) => typeof text === 'string' && text.length <= 200 && EMAIL_REGEX.test(text);
const isPhoneNumber = (text) => typeof text === 'string' && PHONE_NUMBER_REGEX.test(text);
const isUrl = (text) => typeof text === 'string' && text.length > 0;

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
  const privacy = await service.getUserPrivacy(user);
  res.json({
    message: 'success',
    user: {
      id: user.id,
      name: privacy.name ? user.name : null,
      nameEnglish: privacy.nameEnglish ? user.nameEnglish : null,
      level: privacy.level ? user.level : Level.UNKNOWN,
      email: privacy.email ? user.email : null,
      phone: privacy.phone ? user.phone : null,
      picture: privacy.picture ? user.picture : null,
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
  res.json({
    message: 'success',
    logs: logs.map((log) => ({
      id: log.id,
      action: log.action,
      createdAt: log.createdAt,
    })),
  });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const getMyPrivacy = async (req, res) => {
  const { user } = req;
  const privacy = await service.getUserPrivacy(user);
  res.json({
    message: 'success',
    privacy: {
      name: privacy.name,
      nameEnglish: privacy.nameEnglish,
      level: privacy.level,
      email: privacy.email,
      phone: privacy.phone,
      picture: privacy.picture,
    },
  });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await service.getUser(id);
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
 * @throws {BadRequestError} 유효하지 않은 입력
 * @throws {NotFoundError} 비밀번호 오류
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
 * @throws {BadRequestError} 유효하지 않은 입력
 */
const updateMe = async (req, res) => {
  const { user } = req;
  const {
    name, nameEnglish,
    email, phone, password, picture,
  } = req.body;
  const data = {};
  if (name) {
    if (isUserName(name)) {
      data.name = name;
    } else {
      throw new BadRequestError('The given name is invalid');
    }
  }
  if (nameEnglish) {
    if (isUserName(nameEnglish)) {
      data.nameEnglish = nameEnglish;
    } else {
      throw new BadRequestError('The given english name is invalid');
    }
  }
  if (email) {
    if (isEmail(email)) {
      data.email = email;
    } else {
      throw new BadRequestError('The given email is invalid');
    }
  }
  if (phone) {
    if (isPhoneNumber(phone)) {
      data.phone = phone;
    } else {
      throw new BadRequestError('The given phone is invalid');
    }
  }
  if (password) {
    if (isPassword(password)) {
      data.password = password;
    } else {
      throw new BadRequestError('The given password is invalid');
    }
  }
  if (picture) {
    if (isUrl(picture)) {
      data.picture = picture;
    } else {
      throw new BadRequestError('The given picture url is invalid');
    }
  }
  if (Object.keys(data).length >= 1) { // check data size
    await service.updateUser(user, data);
    res.json({ message: 'success' });
  } else {
    throw new BadRequestError('The given data is empty');
  }
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * @throws {BadRequestError} 유효하지 않은 입력
 */
const updateMyPrivacy = async (req, res) => {
  const { user } = req;
  const {
    name, nameEnglish, level,
    email, phone, password, picture,
  } = req.body;
  const visiblities = {
    name,
    nameEnglish,
    level,
    email,
    phone,
    password,
    picture,
  };
  if (Object.values(visiblities).every((visibility) => typeof visibility === 'boolean' || visibility === undefined)) {
    await service.updateUserPrivacy(user, visiblities);
    res.json({ message: 'success' });
  } else {
    throw new BadRequestError('The given data is not boolean');
  }
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
