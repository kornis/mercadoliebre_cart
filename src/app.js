const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const indexRouter = require('./routes');
const productRouter = require('./routes/products');
const expressSession = require('express-session');
const userMiddleware = require('./middlewares/userLogged');
const cookieParser = require('cookie-parser');



app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '../public')));
app.use(expressSession({resave: false, saveUninitialized: false, secret: 'Est3 3S un SeCr3tO'}));
app.use(cookieParser('Est3 3S un SeCr3tO'));
app.use(userMiddleware);

app.use('/',indexRouter);
app.use('/products', productRouter);

app.listen(port, () => console.log(`Listen to server at port: ${port}`));