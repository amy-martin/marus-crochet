const express = require('express');
const {addShoppingSession, deleteShoppingSession, getShoppingSessionId} = require('../helpers/shoppingSession/shoppingSessionHelpers');
const { verifyToken } = require('../helpers/config/cookies');
const shoppingSessionRouter = express.Router();


// SHOPPING SESSION ROUTES

shoppingSessionRouter.post('/', verifyToken, addShoppingSession)
shoppingSessionRouter.delete('/', verifyToken, deleteShoppingSession);
shoppingSessionRouter.get('/', verifyToken, getShoppingSessionId)
module.exports = {shoppingSessionRouter}