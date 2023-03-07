const { pool } = require('../../db/server.js');
const express = require('express');
const productsRouter = express.Router();

productsRouter.get('/:id', () => {})

productsRouter.get('/categories', () => {})

module.exports = { productsRouter }