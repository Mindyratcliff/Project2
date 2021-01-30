module.exports = (sequelize, DataTypes) => {
  const Drawing = sequelize.define("Drawing", {

    body: {
      type: DataTypes.JSON,
      
    },
  });
  return Drawing;
};
