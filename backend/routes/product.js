const { getProductById, getProductByDescription } = require('../helpers/products/productsHelpers.js')
const express = require('express');
const productRouter = express.Router();

productRouter.get('/:id', getProductById)
productRouter.get('/desc/:desc', getProductByDescription)

module.exports = { productRouter }