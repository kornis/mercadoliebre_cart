const multer = require('multer');
const {join, extname} = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const avatarRoutesArray = ['/registro','/perfil'];
        const imagesPath = avatarRoutesArray.includes(req.url) ? ['public','images','avatars'] : ['public','images','products'];
        cb(null, join(__dirname,'../../', ...imagesPath));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname} - ${Date.now()}${extname(file.originalname)}`);
    },

})

module.exports =  multer({storage});