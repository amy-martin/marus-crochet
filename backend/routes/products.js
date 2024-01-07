const { getProducts } = require('../helpers/products/productsHelpers.js')
const express = require('express');
const productsRouter = express.Router();



productsRouter.get('/:category?', getProducts);

module.exports = { productsRouter }