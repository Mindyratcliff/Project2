module.exports = (sequelize, DataTypes) => {
    const Drawing = sequelize.define('Drawing', {
        body: {
            type: DataTypes.JSON,
        },
    });

    Drawing.associate = models => {
        Drawing.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Drawing;
};
