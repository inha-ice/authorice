const argon2 = require('argon2');
const dotenv = require('dotenv');
const Action = require('../constants/Action');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const {
  User, UserPrivacy, UserSecurityLog,
  sequelize,
} = require('../database/models');
const { signToken } = require('../utils/token');

dotenv.config();

const { USER_DEFAULT_PASSWORD = '1234' } = process.env;

/**
 * 사용자의 정보를 생성합니다.
 * @async
 * @param {Object} data
 * @returns {Promise.<string>} 토큰
 * @throws {BadRequestError} 중복 가입
 * @throws {TokenSignError} 토큰 생성 실패
 */
const createUser = async (data) => {
  const { id, name, password } = data;
  const hashedPassword = await argon2.hash(password);
  const prevUser = await User.findByPk(id);
  if (prevUser) {
    throw new BadRequestError('This user already signed up');
  } else {
    await sequelize.transaction(async (transaction) => {
      await User.upsert({
        id,
        name,
        hashedPassword,
        deletedAt: null, // 재가입 사용자의 탈퇴 기록 삭제
      }, { transaction });
      await UserPrivacy.create({ userId: id }, { transaction });
      await UserSecurityLog.create({ userId: id, action: Action.CREATE_USER() }, { transaction });
    });
    const payload = { id, name };
    const token = await signToken(payload);
    return token;
  }
};

/**
 * 사용자의 정보를 삭제합니다.
 * @async
 * @param {Model} user 사용자
 * @param {Model} [actor] 관리자
 */
const deleteUser = async (user, actor) => {
  const { id } = user;
  await sequelize.transaction(async (transaction) => {
    await user.destroy({ transaction });
    await UserSecurityLog.create({
      userId: id,
      action: (actor ? Action.DELETE_USER_BY(actor.id) : Action.DELETE_USER()),
    }, { transaction });
  });
};

/**
 * 아이디를 가지는 사용자를 반환합니다.
 * @async
 * @param {number} id 시용자 아이디
 * @param {Model} [actor] 관리자
 * @returns {Promise.<Model>} 사용자
 * @throws {NotFoundError} 존재하지 않는 사용자
 */
const getUser = async (id, actor) => {
  const user = await User.findByPk(id);
  if (user) {
    await UserSecurityLog.create({
      userId: id,
      action: (actor ? Action.READ_USER_BY(actor.id) : Action.READ_USER()),
    });
    return user;
  }
  throw new NotFoundError('The user with given id is not found');
};

/**
 * 모든 사용자 목록을 반환합니다.
 * @async
 * @param {Model} actor 관리자
 * @returns {Promise.<Array.<Model>>} 사용자 목록
 */
const getUsers = async (actor) => {
  const users = await User.findAll();
  await UserSecurityLog.bulkCreate(users.map((user) => ({
    userId: user.id,
    action: Action.READ_USER_BY(actor.id),
  })));
  return users;
};

/**
 * 사용자의 로그를 반환합니다.
 * @async
 * @param {Model} user 사용자
 * @param {Model} [actor] 관리자
 * @returns {Promise.<Array.<Model>>} 사용자 로그
 */
const getUserLogs = async (user, actor) => {
  const { id } = user;
  const logs = await UserSecurityLog.findAll({ where: { userId: id } });
  await UserSecurityLog.create({
    userId: id,
    action: (actor ? Action.READ_USER_LOG_BY(actor.id) : Action.READ_USER_LOG()),
  });
  return logs;
};

/**
 * 사용자의 정보공개설정을 반환합니다.
 * @async
 * @param {Model} user 사용자
 * @param {Model} [actor] 관리자
 * @returns {Promise.<Model>} 사용자 정보공개설정
 */
const getUserPrivacy = async (user, actor) => {
  const { id } = user;
  const privacy = await UserPrivacy.findOne({ where: { userId: id } });
  await UserSecurityLog.create({
    userId: id,
    action: (actor ? Action.READ_USER_PRIVACY_BY(actor.id) : Action.READ_USER_PRIVACY()),
  });
  return privacy;
};

/**
 * 아이디와 비밀번호를 데이터베이스에서 조회하고 토큰을 생성해 반환합니다.
 * @async
 * @param {number} id 사용자 아이디
 * @param {string} password Hashed password
 * @returns {Promise.<string>} 토큰
 * @throws {NotFoundError} 비밀번호 오류
 * @throws {TokenSignError} 토큰 생성 실패
 * @throws {NotFoundError} 존재하지 않는 사용자
 */
const login = async (id, password) => {
  const user = await getUser(id);
  if (await argon2.verify(user.hashedPassword, password)) {
    const { name } = user;
    await UserSecurityLog.create({ userId: id, action: Action.LOGIN() });
    const payload = { id, name };
    const token = await signToken(payload);
    return token;
  }
  throw new NotFoundError('Incorrect password');
};

/**
 * 사용자의 비밀번호를 초기화합니다.
 * @async
 * @param {Model} user 사용자
 * @param {Model} actor 관리자
 */
const resetUserPassword = async (user, actor) => {
  const { id } = user;
  await sequelize.transaction(async (transaction) => {
    const hashedPassword = await argon2.hash(USER_DEFAULT_PASSWORD);
    await user.update({ hashedPassword }, { transaction });
    await UserSecurityLog.create({
      userId: id,
      action: Action.RESET_USER_PASSWORD_BY(actor.id),
    }, { transaction });
  });
};

/**
 * 사용자의 정보를 수정합니다.
 * @async
 * @param {Model} user 사용자
 * @param {Object} data
 */
const updateUser = async (user, data) => {
  const { id } = user;
  const { password } = data;
  const updatedData = { ...data };
  if (password) {
    updatedData.hashedPassword = await argon2.hash(password);
    delete updatedData.password;
  }
  await sequelize.transaction(async (transaction) => {
    await user.update(updatedData, { transaction });
    await UserSecurityLog.create({
      userId: id,
      action: Action.UPDATE_USER(Object.keys(updatedData)),
    }, { transaction });
  });
};

/**
 * 사용자의 권한을 수정합니다.
 * @async
 * @param {Model} user 사용자
 * @param {number} level
 * @param {Model} actor 관리자
 */
const updateUserLevel = async (user, level, actor) => {
  const { id } = user;
  await sequelize.transaction(async (transaction) => {
    await user.update({ level }, { transaction });
    await UserSecurityLog.create({
      userId: id,
      action: Action.UPDATE_USER_LEVEL_BY(actor.id, level),
    }, { transaction });
  });
};

/**
 * 사용자의 정보공개설정을 수정합니다.
 * @async
 * @param {Model} user
 * @param {Object} privacy
 */
const updateUserPrivacy = async (user, privacy) => {
  const { id } = user;
  await sequelize.transaction(async (transaction) => {
    await UserPrivacy.update(privacy, { where: { userId: id }, transaction });
    await UserSecurityLog.create({
      userId: id,
      action: Action.UPDATE_USER_PRIVACY(Object.keys(privacy)),
    }, { transaction });
  });
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  getUserLogs,
  getUserPrivacy,
  login,
  resetUserPassword,
  updateUser,
  updateUserLevel,
  updateUserPrivacy,
};
