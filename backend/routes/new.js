const express = require('express');
const { getNewProducts } = require('../helpers/products/productsHelper.js')
const newRouter = express.Router();

newRouter.get('/', getNewProducts)

module.exports = {newRouter}
