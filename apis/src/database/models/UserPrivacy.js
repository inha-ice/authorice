module.exports = (sequelize, DataTypes) => {
  const { dialect } = sequelize.options;

  const UserPrivacy = sequelize.define('userPrivacy', {
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
    timestamps: true,
    paranoid: true,
  });

  UserPrivacy.associate = (models) => {
    UserPrivacy.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        primaryKey: (dialect === 'mysql'),
      },
    });
  };

  return UserPrivacy;
};
