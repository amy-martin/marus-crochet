const express = require('express');
const { getCartItem, getAllCartItems, deleteCartItem, updateCartItemQuantity, addCartItem } = require('../helpers/cart/cartHelpers.js');
const cartRouter = express.Router();


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

module.exports = {cartRouter};