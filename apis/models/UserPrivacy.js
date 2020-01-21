module.exports = (sequelize, DataTypes) => {
  const UserPrivacy = sequelize.define('UserPrivacy', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nameVisibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    nameEnglishVisibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    levelVisibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    emailVisibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    phoneVisibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    pictureVisibility: {
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
