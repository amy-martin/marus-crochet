const express = require('express');
const { getAllCartItems, deleteCartItem, updateCartItemQuantity, addCartItem, getCartItemTotalPrice, getCartSumDetails, deleteAllCartItems } = require('../helpers/cart/cartHelpers.js');
const { verifyToken } = require('../helpers/config/cookies.js');
const cartRouter = express.Router();


//  GENERAL CART ROUTES

// POST Route to Add Cart Item
cartRouter.post('/:shoppingSessionID', verifyToken, addCartItem)

// GET Route to Get Cart Item Total Price
cartRouter.get('/:shoppingSessionID/cartItem/:productId', verifyToken, getCartItemTotalPrice)

// GET Route to Get All Cart Items
cartRouter.get('/:shoppingSessionID', verifyToken, getAllCartItems)

// GET Route to Get Cart Quantity
cartRouter.get('/:shoppingSessionID/cartSumDetails', verifyToken, getCartSumDetails)

// PUT Route to Update Cart Item Quantity
cartRouter.put('/:shoppingSessionID/updateQuantity', verifyToken, updateCartItemQuantity)

// DELETE Route to Delete Cart Item 
cartRouter.delete('/:shoppingSessionID/delete/:productId', verifyToken, deleteCartItem)

// DELETE Route to Delete All Cart Items
cartRouter.delete('/:shoppingSessionID', verifyToken, deleteAllCartItems)






module.exports = {cartRouter};