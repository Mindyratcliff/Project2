module.exports = (sequelize, DataTypes) => {
    const Drawing = sequelize.define('Drawing', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.JSON,
            allowNull: false,
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
