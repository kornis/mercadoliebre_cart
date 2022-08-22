module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('images', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        path: DataTypes.STRING,
        id_product: {
            type: DataTypes.BIGINT,
            foreignKey: true
        }
    },
    {
        tableName: 'images',
        timestamps: false
    })

    Image.associate = function(models){
        Image.belongsTo(models.products, {
            foreignKey: 'id_product',
        })
    }

    return Image;
}