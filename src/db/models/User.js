module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        id_imagen: DataTypes.BIGINT,
    },
        {
            tableName: 'users',
            timestamps: false
        })

        User.associate = (models) => {
            User.belongsTo(models.images, {
                foreignKey: "id_imagen",
            }),

            User.hasMany(models.cart, {
                foreignKey: 'id_user'
            })
        }

    return User;
}