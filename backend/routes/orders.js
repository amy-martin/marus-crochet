const express = require('express');
const { getAllOrders, getOrderById } = require('../helpers/orders/ordersHelpers');
const { checkAuthenticated } = require('../helpers/config/passport.js');
const ordersRouter = express.Router();

// GET Route to Retrieve All Orders
ordersRouter.get('/', checkAuthenticated, getAllOrders)

// GET Route to Retrieve Order By Order ID
ordersRouter.get('/:orderID', checkAuthenticated, getOrderById)


module.exports = { ordersRouter }