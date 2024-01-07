const { getProductById } = require('../helpers/products/productsHelpers.js')
const express = require('express');
const productRouter = express.Router();

productRouter.get('/:id', getProductById)

module.exports = { productRouter }