const express = require('express');
const { getCartItem, getAllCartItems, deleteCartItem, updateCartItemQuantity, addCartItem } = require('../helpers/cart/cartHelpers.js');
const { checkoutCart } = require('../helpers/cart/checkoutHelpers.js');
const cartRouter = express.Router();


//  GENERAL CART ROUTES

// POST Route to Add Cart Item
cartRouter.post('/', addCartItem)

// GET Route to Get Cart Item
cartRouter.get('/:cartItemId', getCartItem)

// GET Route to Get All Cart Items
cartRouter.get('/', getAllCartItems)

// PUT Route to Update Cart Item Quantity
cartRouter.put('/:cartItemId', updateCartItemQuantity)

// DELETE Route to Delete Cart Item 
cartRouter.delete('/:cartItemId', deleteCartItem)


// CHECKOUT ROUTES

// POST Route to Check Cart Out

cartRouter.post('/:cartId/checkout', checkoutCart);







module.exports = {cartRouter};