module.exports = (sequelize, DataTypes) => {
  const UserSecurityLog = sequelize.define('UserSecurityLog', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    underscored: true,
    updatedAt: false,
  });
  return UserSecurityLog;
};
