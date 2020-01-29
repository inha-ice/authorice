module.exports = (sequelize, DataTypes) => {
  const UserSecurityLog = sequelize.define('userSecurityLog', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    timestamps: true,
    updatedAt: false,
  });

  UserSecurityLog.associate = (models) => {
    UserSecurityLog.belongsTo(models.User, {
      foreignKey: { allowNull: false },
    });
  };

  return UserSecurityLog;
};
