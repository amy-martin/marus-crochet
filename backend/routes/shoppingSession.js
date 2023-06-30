const express = require('express');
const {addShoppingSession, deleteShoppingSession} = require('../helpers/shoppingSession/shoppingSessionHelpers');
const { verifyToken } = require('../helpers/config/cookies');
const shoppingSessionRouter = express.Router();


// SHOPPING SESSION ROUTES

shoppingSessionRouter.post('/', verifyToken, addShoppingSession)
shoppingSessionRouter.delete('/', deleteShoppingSession);

module.exports = {shoppingSessionRouter}