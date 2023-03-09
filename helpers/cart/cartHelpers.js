const { session } = require('passport');
const { pool } = require('../../db/server.js');


//FIGURE OUT HOW TO ACCESS SESSION ID TO PASS INTO FUNCTION

// Function to retrieve all cart items
const getAllCartItems = async (sessionId) => {
    try {
        const SQL = 'SELECT * FROM cart_items WHERE session_id=$1'
        const cart = await pool.query(SQL, [sessionId]);
        return cart.rows;
    } catch (err) {
        console.log(err);
    }
};

// Function to retrieve cart item by cart

const getCartItem = async (cartItemId) => {
    try {
        const SQL = 'SELECT * FROM cart_items WHERE id=$1';
        const cartItem = await pool.query(SQL, [cartItemId]);
        return cartItem.rows;
    } catch (err) {
        console.log(err)
    }
} 

// Function to add to cart by cart id

const addCartItem = async (sessionId, productId, quantity) => {
    try {
        const SQL = 'INSERT INTO cart_items (session_id, product_id, quantity) VALUES ($1, $2, $3)';
        await pool.query(SQL, [sessionId, productId, quantity]);
    } catch (err) {
        console.log(err);
    }
}

// Function to remove from cart by cart id and product id

const removeCartItem = async (sessionId, productId) => {
    try {
        const SQL = 'DELETE FROM cart_items WHERE session_id=$1 AND product_id=$2';
        await pool.query(SQL, [sessionId, productId]);
    } catch (err) {
        console.log(err);
    }
}

//Function to update cart item quantity 

const updateCartItemQuantity = async (cartItemId, sessionId, productId, quantity) => {
    try {
        const SQL = 'UPDATE cart_items SET quantity=$1 WHERE session_id=$2 AND product_id=$3'
        await pool.query(SQL, [quantity, sessionId, productId]);
        const updatedCartItem = await getCartItem(cartItemId);
        return updatedCartItem
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAllCartItems, getCartItem, addCartItem, removeCartItem, updateCartItemQuantity }
