const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { index } = require("../controllers/productController");
const upload = require('../middlewares/multer');

router.get('/', index);
router.get('/login', userController.loginForm);
router.post('/login', userController.login);
router.get('/logout', (req,res) => req.session.destroy(() => res.redirect('/')));
router.get('/registro', userController.registerForm);
router.post('/registro', upload.single('avatar'), userController.register);
router.get('/perfil', userController.profile);
router.post('/perfil',upload.single('avatar'), userController.updateProfile);

module.exports = router;