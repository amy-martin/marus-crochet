const { pool } = require('../db/server.js')
const { getProductById, getProducts } = require('../helpers/products/productsHelper.js')
const express = require('express');
const productsRouter = express.Router();

productsRouter.get('/:id', getProductById);

productsRouter.get('/', getProducts);
module.exports = { productsRouter }