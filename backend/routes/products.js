const { getProductById, getProducts } = require('../helpers/products/productsHelper.js')
const express = require('express');
const productsRouter = express.Router();



productsRouter.get('/:category?', getProducts);

module.exports = { productsRouter }