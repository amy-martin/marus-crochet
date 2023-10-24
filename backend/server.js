const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const { pool } = require('./db.js')
const pgSession = require('connect-pg-simple')(session);
const dotenv = require('dotenv');
const { userRouter } = require('./routes/user.js');
const { productsRouter } = require('./routes/products.js');
const { cartRouter } = require('./routes/cart.js');
const { ordersRouter } = require('./routes/orders.js');
const { shoppingSessionRouter } = require('./routes/shoppingSession.js');
const flash = require('express-flash');
const { homeRouter } = require('./routes/home.js');
const { productRouter } = require('./routes/product.js');
const { newRouter } = require('./routes/new.js');
const passport = require('passport');
const {initializePassport} = require('./helpers/config/passport.js');
const stripe = require('stripe')('pk_test_51Nd4kJI44bPmT5sAJ7COXv0kZGcu48wTkszJVsV3olT6YJYudZLea6nwXvyypZYBnPIUDDMDCecmuL3I5NZXFAvR00Gi89zAfD');
const {checkoutRouter} = require('./routes/checkout.js')

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
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE']
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
        resave: false,
        saveUninitialized: false
    })
);

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
initializePassport();


app.use(cookieParser(process.env.SESSION_SECRET))



// Miscellaneous Configurations
// Express flash to interpret error messages passport authentication method provides

app.use(flash());

// Mounting Home Routes

app.use('/home', homeRouter);

// Mounting User Routes
app.use('/user', userRouter);

// Mounting Shopping Session Routes

app.use('/shoppingSession', shoppingSessionRouter);

// Mounting Product Routes

app.use('/product', productRouter);
app.use('/products', productsRouter);
app.use('/new', newRouter);

// Mounting Cart Routes

app.use('/cart', cartRouter)
app.use('/orders', ordersRouter)

// Mounting Checkout Routes

app.use('/checkout', checkoutRouter)

const port = process.env.PORT || 10000;

app.listen(port, '0.0.0.0', () => {
    console.log(`App running on port ${port}.`)
});

module.exports = { passport, stripe }
