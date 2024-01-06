const express = require('express');
const { getNewProducts } = require('../helpers/products/productsHelpers.js')
const newRouter = express.Router();

newRouter.get('/', getNewProducts)

module.exports = {newRouter}
