const express = require('express');
const { getAllOrders, getOrderById } = require('../helpers/orders/ordersHelpers');
const ordersRouter = express.Router();

// GET Route to Retrieve All Orders
ordersRouter.get('/', getAllOrders)

// GET Route to Retrieve Order By Order ID
ordersRouter.get('/:orderID', getOrderById)


module.exports = { ordersRouter }