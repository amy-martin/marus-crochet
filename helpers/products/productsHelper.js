const { pool } = require('../../db/server.js');

// Function To Find Product List From Database By Category
const findProductsByCategory = async (categoryId) => {
    try {
        const SQL = 'SELECT * FROM products WHERE category_id=$1';
        const foundProducts = await pool.query(SQL, [categoryId]);
        return foundProducts.rows
    } catch (err) {
        console.log(err)
    }
    
};

// Function To Get Product List From Database

const getProducts = async (req, res, next) => {
    const { category } = req.query;
    try {
        if (category) {
        const productsListByCategory = await findProductsByCategory(category);
        res.send(productsListByCategory);
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
}


// Function To Find Product From Database By ID
const findProductById = async (productId) => {
    try {
        const SQL = 'SELECT * FROM products WHERE id=$1'
        const foundProduct = await pool.query(SQL, [productId]);
        return foundProduct.rows[0]
    } catch (err) {
        console.log(err)
    }
};

// Function To Get Product From Database By ID
const getProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await findProductById(id);
        res.send(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getProducts, getProductById }
