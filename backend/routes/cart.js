const express = require('express');
const { getCartItem, getAllCartItems, deleteCartItem, updateCartItemQuantity, addCartItem } = require('../helpers/cart/cartHelpers.js');
const { checkoutCart } = require('../helpers/cart/checkoutHelpers.js');
const { checkAuthenticated } = require('../helpers/config/passport.js');
const cartRouter = express.Router();


//  GENERAL CART ROUTES

// POST Route to Add Cart Item
cartRouter.post('/', checkAuthenticated, addCartItem)

// GET Route to Get Cart Item
cartRouter.get('/:cartItemId', checkAuthenticated, getCartItem)

// GET Route to Get All Cart Items
cartRouter.get('/', checkAuthenticated, getAllCartItems)

// PUT Route to Update Cart Item Quantity
cartRouter.put('/:cartItemId', checkAuthenticated, updateCartItemQuantity)

// DELETE Route to Delete Cart Item 
cartRouter.delete('/:cartItemId', checkAuthenticated, deleteCartItem)


// CHECKOUT ROUTES

// POST Route to Check Cart Out

cartRouter.post('/:cartId/checkout', checkAuthenticated, checkoutCart);







module.exports = {cartRouter};