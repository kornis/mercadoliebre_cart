const db = require('../db/models');

module.exports = {
    /**
     * @desc Muestra la vista de Listado de productos
     * 
     */
    index: (req, res) => {

        // Buscamos en la DB todos los productos
        db.products.findAll({

            // Incluimos la relación de imagenes
            include: [ db.images ]

        }).then(products => {
            // Retornamos la vista de productos enviando el listado de productos 
            return res.render('index', { products })
        })

    },

    /**
     * 
     * @desc Muestra la vista de creación de producto
     * 
     */
    createForm: (req, res) => {

        // Renderiza la vista de creación de productos
        return res.render('createProduct');
    },

    /**
     * @desc Controlador de creación de producto 
     */
    create: (req, res) => {
    
    // Ejecutamos la creación de un nuevo producto
    db.products.create({

        title: req.body.title,
        description: req.body.description,
        price: req.body.price

    }).then(function(product) {
    
        // Array para almacenar las imagenes que recibimos
        let arrayImages = [];

        // Recorremos el array de archivos recibidos
        for(let i = 0; i < req.files.length ; i++){

            // Por cada archivo, creamos la promesa de la creación
            let promesa = db.images.create({
                path: req.files[i].filename,
                id_product: product.id
            })
            
            // Guardamos la promesa creada en el array de Imagenes
            arrayImages.push(promesa);
        }

        // Ejecutamos todas las promesas de creación de imagenes y redireccionamos a la vista de listado de productos
        Promise.all(arrayImages).then(response => res.redirect('/products'))
    })
},

/**
 * 
 *@desc Renderiza la vista de edición de producto
 *
 */
editForm: (req, res) => {

    // Guardamos el id del producto a editar
    const id = req.params.id;

    // Buscamos el producto a editar por su id
    db.products.findByPk( id, {

        include: [db.images]

    }).then(producto => {

        // Enviamos la vista de edicion de producto con los datos del producto
        return res.render('editProduct', { producto })
    })
},

/**
 * 
 *@desc Guarda las modificaciones realizadas al producto
 * 
 */
edit: (req, res) => {

    // Ejecutamos el update del producto por medio de su id
    db.products.update({

        // spread operator de los datos recibidos por body (sus names coinciden con los nombres de columnas en la DB)
        ...req.body
    },
    {
        // Condición para editar el producto
        where: {
            id: req.params.id
        }
    }).then(producto => {

        // Array de promesas de imagenes
        let arrayImages = [];

        // Recorremos el array de archivos que nos llega por body
        for (let i = 0; i < req.files.length; i++) {

            // Obtenemos la promesa de la creación de una nueva imagen
            let promesa = db.images.create({

                path: req.files[i].filename,
                id_product: req.params.id

            })

            // Guardamos la promesa creada en el array de promesas de imagenes
            arrayImages.push(promesa);
        }

        // Ejecutamos todas las promesas de imagenes y redireccionamos a la vista de productos
        Promise.all(arrayImages).then(() => res.redirect('/products'))
    })
},

/**
 * 
 *@desc Elimina la imagen de la db
 * 
 */
deleteImage: (req, res) => {

    // Guardamos el id de la imagen a eliminar
    const id = req.params.id;

    // Ejecutamos la eliminación de la imagen y redireccionamos a la vista de detalle del producto
    db.images.destroy({ where: { id: id }})
    .then(() => res.redirect('/products/'+ req.query.product))
},

/**
 * 
 * @desc Agrega un nuevo producto al carrito o actualiza el mismo
 * 
 */
addToCart: (req, res) => {

    // Guardamos el id del producto 
    const product_id = req.params.id;

    // Buscamos el carrito activo del usuario incluyendo los productos que contiene
    db.cart.findByPk(req.session.user.id_cart, {include: db.products})
    .then(cart => {

        // Del carrito encontrado, buscamos si existe ya el producto a agregar
        let product_found = cart.products.find(p => p.id == product_id)

        // Si existe el producto, en la tabla intermedia, en la columna de cantidad, le sumamos la cantidad solicitada
        if(product_found){

                db.cartProduct.update({

                    // A la cantidad que ya contiene le sumamos lo solicitado ( se suma 2 a mano, pero hay que recibir la cantidad deseada )
                    cant: product_found.cartProduct.cant + 2
                },
                {
                    where:{

                        id_cart: req.session.user.id_cart,
                        id_product: product_id

                    }
                }).then(() =>{

                    // Redireccionamos a la vista de listado de productos
                    return res.redirect('/products')
                })

            // Si el producto no se encontraba en el carrito, se procede a agregarlo y la cantidad se está escribiendo a mano. ( hay que recibir la cantidad deseada )     
        } else {
            cart.addProduct(product_id, { through: { cant: 1 }})
            .then(() =>{

                // Redireccionamos a la vista de listado de productos
                return res.redirect('/products')
            })
        }
    })
},

/**
 * 
 * @desc Renderiza la vista de carrito con los productos que contiene
 * 
 */
cart: (req, res) => {

    // Buscamos el carrito por su id
    db.cart.findOne({where:
    {
        id: req.session.user.id_cart
    },
    
    // Incluimos los productos del carrito
    include: db.products

    // Renderizamos la vista de carrito enviando los datos del mismo
}).then(cart => res.render('cart', { cart }))

}
}