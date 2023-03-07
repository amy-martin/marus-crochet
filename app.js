// import dotenv from "dotenv";
const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { pool } = require('./db/server.js')
const pgSession = require('connect-pg-simple')(session);
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {userRouter} = require('./routes/user.js');
const { productsRouter } = require('./routes/products.js');


dotenv.config();

// Express Session and Session Store Configuration
// const store = new pgSession({
//     pool,
//     tableName: 'shopping_session'
// });

// BodyParser Configuration
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
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
            sameSite:"none"
        },
        resave: false,
        saveUninitialized: false
    })
);

// CORS Configuration
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true,
    })
);
// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// Mounting User Routes
app.use('/user', userRouter);

// Mounting Product Routes
app.use('/products', productsRouter)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});


