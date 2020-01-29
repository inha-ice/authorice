const argon2 = require('argon2');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const {
  User, UserPrivacy, UserSecurityLog,
  sequelize,
} = require('../database/models');
const { signToken } = require('../utils/jwt');

/**
 * 사용자의 정보를 생성합니다.
 * @async
 * @param {Object} data
 * @returns {Promise.<string>} JWT
 * @throws {BadRequestError} 중복 가입
 * @throws {TokenSignError} JWT 생성 실패
 */
const createUser = async (data) => {
  const { id, name, password } = data;
  const hashedPassword = await argon2.hash(password);
  const prevUser = await User.findByPk(id);
  if (prevUser) {
    throw new BadRequestError('This user already signed up');
  } else {
    await sequelize.transaction(async (transaction) => {
      await User.create({ id, name, hashedPassword }, { transaction });
      await UserPrivacy.create({ userId: id }, { transaction });
      await UserSecurityLog.create({ userId: id, action: 'CREATE' }, { transaction });
    });
    const payload = { id, name };
    const token = await signToken(payload);
    return token;
  }
};

/**
 * 사용자의 정보를 삭제합니다.
 * @async
 * @param {Model} user
 */
const deleteUser = async (user) => {
  const { id } = user;
  await sequelize.transaction(async (transaction) => {
    await user.destroy({ transaction });
    await UserSecurityLog.create({ userId: id, action: 'DELETE' }, { transaction });
  });
};

/**
 * ID를 가지는 사용자를 반환합니다.
 * @async
 * @param {number} id User ID
 * @returns {Promise.<Model>} 사용자
 * @throws {NotFoundError} 존재하지 않는 사용자
 */
const getUser = async (id) => {
  const user = await sequelize.transaction(async (transaction) => {
    const userPromise = User.findByPk(id, { transaction });
    await UserSecurityLog.create({ userId: id, action: 'READ_USER' }, { transaction });
    return userPromise;
  });
  if (user) {
    return user;
  }
  throw new NotFoundError('The user with given id is not found');
};

/**
 * 사용자의 로그를 반환합니다.
 * @async
 * @param {Model} user
 * @returns {Promise.<Array.<Model>>} 사용자 로그
 */
const getUserLogs = async (user) => {
  const { id } = user;
  const logs = await sequelize.transaction(async (transaction) => {
    const logsPromise = UserSecurityLog.findAll({ where: { userId: id }, transaction });
    await UserSecurityLog.create({ userId: id, action: 'READ_USER_LOG' }, { transaction });
    return logsPromise;
  });
  return logs;
};

/**
 * 사용자의 정보공개설정을 반환합니다.
 * @async
 * @param {Model} user
 * @returns {Promise.<Model>} 사용자 정보공개설정
 */
const getUserPrivacy = async (user) => {
  const { id } = user;
  const privacy = await sequelize.transaction(async (transaction) => {
    const privacyPromise = UserPrivacy.findOne({ where: { userId: id }, transaction });
    await UserSecurityLog.create({ userId: id, action: 'READ_USER_PRIVACY' }, { transaction });
    return privacyPromise;
  });
  return privacy;
};

/**
 * ID와 비밀번호를 데이터베이스에서 조회하고 JWT를 생성해 반환합니다.
 * @async
 * @param {number} id User ID
 * @param {string} password Hashed password
 * @returns {Promise.<string>} JWT
 * @throws {NotFoundError} 비밀번호 오류
 * @throws {TokenSignError} JWT 생성 실패
 * @throws {NotFoundError} 존재하지 않는 사용자
 */
const login = async (id, password) => {
  const user = await getUser(id);
  if (await argon2.verify(user.hashedPassword, password)) {
    const { name } = user;
    await UserSecurityLog.create({ userId: id, action: 'LOGIN' });
    const payload = { id, name };
    const token = await signToken(payload);
    return token;
  }
  throw new NotFoundError('Incorrect password');
};

/**
 * 사용자의 정보를 수정합니다.
 * @async
 * @param {Model} user
 * @param {Object} data
 */
const updateUser = async (user, data) => {
  const { password } = data;
  const updatedData = { ...data };
  if (password) {
    updatedData.hashedPassword = await argon2.hash(password);
    delete updatedData.password;
  }
  await sequelize.transaction(async (transaction) => {
    await user.update(updatedData, { transaction });
    await UserSecurityLog.create({ userId: user.id, action: 'UPDATE_USER' }, { transaction });
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
    await UserSecurityLog.create({ userId: id, action: 'UPDATE_USER_PRIVACY' }, { transaction });
  });
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUserLogs,
  getUserPrivacy,
  login,
  updateUser,
  updateUserPrivacy,
};
