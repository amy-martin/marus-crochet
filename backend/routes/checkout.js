const express = require('express');
const {  createCheckoutSession, webhookHandler } = require('../helpers/cart/checkoutHelpers');
const {verifyToken} = require('../helpers/config/cookies.js');
const checkoutRouter = express.Router();



checkoutRouter.post('/create-checkout-session', verifyToken, createCheckoutSession);

// checkoutRouter.post('/webhook', express.raw({type: 'application/json'}), webhookHandler)

module.exports = {checkoutRouter}