const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { index } = require("../controllers/productController");
const upload = require('../middlewares/multer');
const privateRoute = require('../middlewares/privateRouteMiddleware');

router.get('/', index);
router.get('/login', userController.loginForm);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/registro', userController.registerForm);
router.post('/registro', upload.single('avatar'), userController.register);
router.get('/perfil', privateRoute, userController.profile);
router.post('/perfil',upload.single('avatar'), userController.updateProfile);

module.exports = router;