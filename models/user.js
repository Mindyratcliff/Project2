module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Drawing, {
      onDelete: "cascade",
    });
  };

  return User;
};
