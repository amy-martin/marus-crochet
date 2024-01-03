const { getProductById } = require('../helpers/products/productsHelper.js')
const express = require('express');
const productRouter = express.Router();

productRouter.get('/:id', getProductById)

module.exports = { productRouter }