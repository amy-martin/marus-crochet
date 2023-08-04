const express = require('express');
const { getAllCartItems, deleteCartItem, updateCartItemQuantity, addCartItem, getCartItemTotalPrice, getCartQuantity } = require('../helpers/cart/cartHelpers.js');
const { checkoutCart } = require('../helpers/cart/checkoutHelpers.js');
const { checkAuthenticated } = require('../helpers/config/passport.js');
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
cartRouter.get('/:shoppingSessionID/cartQuantity', verifyToken, getCartQuantity)

// PUT Route to Update Cart Item Quantity
cartRouter.put('/:shoppingSessionID/updateQuantity', verifyToken, updateCartItemQuantity)

// DELETE Route to Delete Cart Item 
cartRouter.delete('/:shoppingSessionID/', verifyToken, deleteCartItem)

// CHECKOUT ROUTES

// POST Route to Check Cart Out

cartRouter.post('/:cartId/checkout', verifyToken, checkoutCart);







module.exports = {cartRouter};