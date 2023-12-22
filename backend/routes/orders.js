const express = require('express');
const { getAllOrders, getOrderByOrderId } = require('../helpers/orders/ordersHelpers');
const { verifyToken } = require('../helpers/config/cookies');
const ordersRouter = express.Router();

// GET Route to Retrieve All Orders
ordersRouter.get('/', verifyToken, getAllOrders)

// ordersRouter.post('/', verifyToken, addOrder)

ordersRouter.get('/:orderID', verifyToken, getOrderByOrderId)

module.exports = { ordersRouter }