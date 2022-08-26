const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const apiProductController = require('../controllers/apiProductController');
const upload = require('../middlewares/multer');
const privateRoute = require('../middlewares/privateRouteMiddleware');

router.get('/', productController.index);
router.get('/nuevo', productController.createForm);
router.post('/nuevo', upload.any(),productController.create);
router.get('/cart', privateRoute, productController.cart);
router.get('/cart/:id', privateRoute, productController.addToCart);
router.get('/borrar-imagen/:id', productController.deleteImage);
router.get('/:id', productController.editForm);
router.post('/:id', upload.any(), productController.edit);
router.get('/detalle/:id', productController.productDetail);
router.post("/api/cart/:id", privateRoute, apiProductController.addToCart);

module.exports = router;