// import dotenv from "dotenv";
const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { pool } = require('./db.js')
const pgSession = require('connect-pg-simple')(session);
const dotenv = require('dotenv');
const { userRouter } = require('./routes/user.js');
const { productsRouter } = require('./routes/products.js');
const { cartRouter } = require('./routes/cart.js');
const { ordersRouter } = require('./routes/orders.js');
const { passportConfiguration } = require('./helpers/user/passportConfigHelper')
const passport = require('passport')
const flash = require('express-flash')
const initializePassport = require('./helpers/user/passportConfigHelper');
const { findUserByUsername, findUserById } = require('./helpers/user/userHelpers.js');
const { homeRouter } = require('./routes/home.js');
const { productRouter } = require('./routes/product.js');
dotenv.config();


// BodyParser Configuration
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// CORS Configuration
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD']
    })
);

// DB Session and Cookie Configuration
app.use(
    session({
        store: new pgSession({
            pool,
            createTableIfMissing: true
        }),
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000*60*60*24, 
            secure: true,
            httpOnly: false,
            sameSite:"none"
        },
        resave: false,
        saveUninitialized: false
    })
);

app.use(cookieParser(process.env.SESSION_SECRET))

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
initializePassport(
    passport,
    findUserByUsername,
    findUserById
)

// Miscellaneous Configurations
// Express flash to interpret error messages passport authentication method provides

app.use(flash());

// Mounting Home Routes

app.use('/home', homeRouter)

// Mounting User Routes
app.use('/user', userRouter);

// Mounting Product Routes

app.use('/product', productRouter)
app.use('/products', productsRouter)

// Mounting Cart Routes

app.use('/cart', cartRouter)

app.use('/orders', ordersRouter)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

module.exports = { passport }