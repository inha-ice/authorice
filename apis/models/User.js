module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nameEnglish: {
      type: DataTypes.STRING(50),
    },
    level: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    email: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(100),
    },
    hashedPassword: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING(200),
    },
  }, {
    timestamps: false,
    underscored: true,
  });
  return User;
};
