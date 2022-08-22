const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/multer');

router.get('/', productController.index);
router.get('/nuevo', productController.createForm);
router.post('/nuevo', upload.any(),productController.create);
router.get('/cart', productController.cart);
router.get('/cart/:id', productController.addToCart);
router.get('/borrar-imagen/:id', productController.deleteImage);
router.get('/:id', productController.editForm);
router.post('/:id', upload.any(), productController.edit);

module.exports = router;