const express = require('express');
const {  createCheckoutSession } = require('../helpers/cart/checkoutHelpers');
const {verifyToken} = require('../helpers/config/cookies.js');
const checkoutRouter = express.Router();
const bodyParser = require('body-parser');
checkoutRouter.post('/create-checkout-session', verifyToken, createCheckoutSession);

// checkoutRouter.post('/webhook', express.raw({type: 'application/json'}), webhookHandler)

module.exports = {checkoutRouter}