module.exports = (sequelize, DataTypes) => {
  const UserPrivacy = sequelize.define('UserPrivacy', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    nameEnglish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    level: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    email: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    picture: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    timestamps: false,
    underscored: true,
  });
  return UserPrivacy;
};
