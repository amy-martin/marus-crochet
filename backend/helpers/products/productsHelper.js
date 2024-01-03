const { pool } = require('../../db.js');

// Function To Find Product List From Database By Category
const findProductsByCategory = async (category) => {
    try {
        const SQL = 'SELECT *, product_categories.id as category_id FROM product_categories INNER JOIN products ON products.category_id = product_categories.id WHERE product_categories.name=$1';
        const products = await pool.query(SQL, [category]);
        return products.rows
        
    } catch (err) {
        console.log('Error in findProductsByCategory')
        console.log(err)
    }
    
};

// Function to Find All Products From Database Grouped By Category
const findProducts = async () => {
    try {
        const SQL = 'SELECT * FROM products GROUP BY id,category_id'
        const products = await pool.query(SQL);
        return products.rows
    } catch (err) {
        console.log('Error in findProducts')
        console.log(err);
    }
}
// Function to Retrieve Products by Descending ID Order (Newest Products First)
const findNewProducts = async () => {
    try {
        const SQL = 'SELECT * FROM products ORDER BY id DESC'
        const products = await pool.query(SQL);
        return products.rows
    } catch (err) {
        console.log('Error in findNewProducts')
        console.log(err);
    }
}
// Function To Get Product List From Database

const getProducts = async (req, res, next) => {
    try {
        const { category } = req.params;
        if (category) {
            const productsListByCategory = await findProductsByCategory(category);
            return res.json({products: productsListByCategory});
        } else {
            const products = await findProducts();
            return res.json({products});
        };
    } catch (err) {

        return res.status(500).json({ message: err.message })
    }
    
}


// Function To Find Product From Database By ID
const findProductById = async (productId) => {
    try {
        const SQL = 'SELECT * FROM products WHERE id=$1'
        const foundProduct = await pool.query(SQL, [productId]);
        return foundProduct.rows[0]
    } catch (err) {
        console.log('Error in findProductById')
        console.log(err)
    }
};

// Function To Get Product From Database By ID
const getProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await findProductById(id);
        return res.json({product})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Function To Find Product From Database By ID
const getProductByDescriptionQuery = async (desc) => {
    try {
        const SQL = 'SELECT * FROM products WHERE desc=$1'
        const foundProduct = await pool.query(SQL, [desc]);
        return foundProduct.rows[0]
    } catch (err) {
        console.log('Error in findProductById')
        console.log(err)
    }
};
const getProductByDescription = async (req,res) => {
    try {
        const {desc} = req.params;
        const descWithoutUnderscore = desc.replace(/_/g, ' ')
        const product = await getProductByDescriptionQuery(descWithoutUnderscore);
        return product
    } catch (err) {
        console.log('Error in findProductById')
        console.log(err)
    }
};

// Function to Get Products in Reverse Id Order (Newest Added First)
const getNewProducts = async(req, res, next) => {
    try {
        const products = await findNewProducts();
        return res.json({products})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getProducts, getProductById, getNewProducts, getProductByDescription }
