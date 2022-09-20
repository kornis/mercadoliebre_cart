module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('products',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING(150),
            description: DataTypes.TEXT,
            price: DataTypes.DECIMAL(10, 2)

        },
        {
            tableName: 'products',
            timestamps: false
        })

    Product.associate = function (models) {
        Product.hasMany(models.images, {
            foreignKey: 'id_product'
        }),

        Product.belongsToMany(models.cart, {
            foreignKey: "id_product",
            otherKey: 'id_cart',
            // hacemos la relación llamando al modelo creado de la tabla intermedia para poder obtener el campo extra
            through: models.cartProduct
        })
    }

    return Product
}