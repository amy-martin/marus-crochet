const express = require('express');
const { getAllOrders, getOrderById, addOrder, getOrderByPaymentId } = require('../helpers/orders/ordersHelpers');
const { checkAuthenticated } = require('../helpers/config/passport.js');
const { verifyToken } = require('../helpers/config/cookies');
const ordersRouter = express.Router();

// GET Route to Retrieve All Orders
ordersRouter.get('/:userID', verifyToken, getAllOrders)

ordersRouter.post('/', verifyToken, addOrder)

ordersRouter.get('/:userID/:paymentID', verifyToken, getOrderByPaymentId)

module.exports = { ordersRouter }