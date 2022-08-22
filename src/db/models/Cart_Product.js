

module.exports = (sequelize, DataTypes) => {

    // Creamos el modelo de la tabla intermedia para agregar un campo extra en esta tabla
    const CartProduct = sequelize.define('cartProduct', {

        // Campo extra en la tabla intermedia. Los id de las relaciones, sequelize los agrega por defecto
        cant: DataTypes.INTEGER
    },
    {
        tableName: 'cart_product',
        timestamps: false
    }
    )

    return CartProduct;
}