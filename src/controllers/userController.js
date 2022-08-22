const db = require('../db/models');

module.exports = {
    loginForm: (req,res) => {
        return res.render('login');
    },
    login: (req,res) => {
        db.users.findOne({
            where: {
                email: req.body.email
            },
            include: db.cart
        }).then((user) => {
                if(user && user.password == req.body.password){

                    let cart = user.carts.find(cart => cart.status == true)
                    if (cart) {
                        req.session.user = {
                            name: user.name,
                            avatar: user.avatar,
                            id: user.id,
                            id_cart: cart.id
                        }
                        return res.redirect('/perfil')
                    }else{
                    db.cart.create({
                        status: 1,
                        id_user: user.id
                    }).then(cart => {
                        req.session.user = {
                            name: user.name,
                            avatar: user.avatar,
                            id: user.id,
                            id_cart: cart.id
                        }
                        return res.redirect('/perfil')
                    })
            }
            }else{
                    return res.send('El usuario y/o contraseña son incorrectos...')
            }
        })
       
    },

    registerForm: (req, res) => {
        return res.render('register')
    },
    register: (req,res) => {
        db.images.create({
            path: req.file.filename
        }).then((data) => {
            db.users.create({
                email: req.body.email,
                password: req.body.password,
                avatar: data.path,
                id_imagen: data.id
            }).then((user)=> {
                req.session.user = {
                    name: user.name,
                    avatar: user.avatar,
                    id: user.id
                }
                return res.redirect('/perfil')
            }).catch((error) => res.send('error con el id'))
        }).catch((error)=>console.log(error))





     
    },
    profile: (req, res) => {
        const id = req.session.user.id;
        db.users.findByPk(id)
        .then((user) => {
            return res.render('perfil', {user})
        })
    },
    updateProfile: (req, res) => {
        const id = req.session.user.id;
        db.users.findByPk(id)
        .then((user)=> {
            db.users.update({
                email: req.body.email,
                password: req.body.password,
                avatar: req.file ? req.file.filename : req.session.user.avatar 
            },{
               where:{
                    id
               } 
            })
            .then(() => {
                return res.redirect('/perfil')
            })
        })
        
    }
}