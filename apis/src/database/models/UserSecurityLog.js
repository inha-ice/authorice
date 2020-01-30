module.exports = (sequelize, DataTypes) => {
  const { dialect } = sequelize.options;

  const UserSecurityLog = sequelize.define('userSecurityLog', {
    id: {
      type: (dialect === 'mysql' ? DataTypes.BIGINT.UNSIGNED : DataTypes.BIGINT),
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
