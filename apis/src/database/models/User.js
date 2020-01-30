const Level = require('../../constants/Level');

module.exports = (sequelize, DataTypes) => {
  const { dialect } = sequelize.options;

  const User = sequelize.define('user', {
    id: {
      type: (dialect === 'mysql' ? DataTypes.MEDIUMINT.UNSIGNED : DataTypes.INTEGER),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nameEnglish: DataTypes.STRING(50),
    level: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: Level.GUEST,
    },
    email: DataTypes.STRING(200),
    phone: DataTypes.CHAR(13),
    hashedPassword: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    picture: DataTypes.STRING(200),
  }, {
    timestamps: true,
    paranoid: true,
  });
  return User;
};
