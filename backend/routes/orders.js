const express = require('express');
const { getAllOrders, getOrderById, addOrder } = require('../helpers/orders/ordersHelpers');
const { checkAuthenticated } = require('../helpers/config/passport.js');
const { verifyToken } = require('../helpers/config/cookies');
const ordersRouter = express.Router();

// GET Route to Retrieve All Orders
ordersRouter.get('/', verifyToken, getAllOrders)

// // GET Route to Retrieve Order By Order ID
// ordersRouter.get('/:orderID', verifyToken, getOrderById)

ordersRouter.post('/', verifyToken, addOrder)

module.exports = { ordersRouter }