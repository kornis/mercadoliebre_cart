const db = require("../db/models");


module.exports = {
    addToCart: (req, res) => {

        // Guardamos el id del producto 
        const product_id = req.params.id;

        // Buscamos el carrito activo del usuario incluyendo los productos que contiene
        db.cart.findByPk(req.session.user.id_cart, { include: db.products })
            .then(cart => {

                // Del carrito encontrado, buscamos si existe ya el producto a agregar
                let product_found = cart.products.find(p => p.id == product_id)


                if (req.body.cant == 0) {
                    db.cartProduct.destroy({
                        where: {
                            id_cart: req.session.user.id_cart,
                            id_product: product_id
                        }
                    }).then(() => {
                        return res.status(201).json({ statusCode: res.statusCode })
                    })
                } else {
                    // Si existe el producto, en la tabla intermedia, en la columna de cantidad, le sumamos la cantidad solicitada
                    if (product_found) {

                        db.cartProduct.update({

                            // A la cantidad que ya contiene le sumamos lo solicitado ( se suma 2 a mano, pero hay que recibir la cantidad deseada )
                            cant: req.body.cant
                        },
                            {
                                where: {

                                    id_cart: req.session.user.id_cart,
                                    id_product: product_id

                                }
                            }).then(() => {

                                // Redireccionamos a la vista de listado de productos
                                return res.status(201).json({
                                    statusCode: res.statusCode
                                })
                            })

                        // Si el producto no se encontraba en el carrito, se procede a agregarlo y la cantidad se está escribiendo a mano. ( hay que recibir la cantidad deseada )     
                    } else {
                        cart.addProduct(product_id, { through: { cant: req.body.cant } })
                            .then(() => {

                                // Redireccionamos a la vista de listado de productos
                                return res.status(201).json({
                                    statusCode: res.statusCode
                                })
                            })
                    }
                }
            })
    }
}