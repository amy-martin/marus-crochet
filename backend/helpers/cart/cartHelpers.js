const { pool } = require('../../db/server.js');


//FIGURE OUT HOW TO ACCESS SESSION ID TO PASS INTO FUNCTION

// Function to retrieve all cart items
const getAllCartItemsQuery = async (sessionID) => {
    try {
        const SQL = 'SELECT * FROM cart_items WHERE session_id=$1'
        const cart = await pool.query(SQL, [sessionID]);
        return cart.rows;
    } catch (err) {
        console.log(err);
    }
};

// Callback function to get all cart items route
const getAllCartItems = async (req, res) => {
    try {
        const sessionID = req.sessionID;
        await getAllCartItemsQuery(sessionID);
    } catch (err) {
        console.log(err)
    }

}
// Function to retrieve cart item by cart

const getCartItemQuery = async (cartItemId) => {
    try {
        const SQL = 'SELECT * FROM cart_items WHERE id=$1';
        const cartItem = await pool.query(SQL, [cartItemId]);
        return cartItem.rows;
    } catch (err) {
        console.log(err)
    }
} 

// Callback function to get cart item route
const getCartItem = async (req, res) => {
    try {
        const {cartItemId} = req.params;
        await getCartItemQuery(cartItemId);
    } catch (err) {
        console.log(err)
    }
}


// Function to add to cart by cart id

const addCartItemQuery = async (sessionID, productId, quantity) => {
    try {
        const SQL = 'INSERT INTO cart_item (session_id, product_id, quantity) VALUES ($1, $2, $3)';
        await pool.query(SQL, [sessionID, productId, quantity]);
    } catch (err) {
        console.log(err);
    }
}

// Callback function to post cart item route

const addCartItem = async (req, res) => {
    try {
        const sessionID = req.sessionID;
        const {productId, quantity} = req.body;
        await addCartItemQuery(sessionID, productId, quantity)
    } catch (err) {
        console.log(err)
    }
};

// Function to remove from cart by cart id and product id

const deleteCartItemQuery = async (cartItemId, sessionID) => {
    try {
        const SQL = 'DELETE FROM cart_items WHERE id=$1 AND session_id=$2';
        await pool.query(SQL, [cartItemId, sessionID]);
    } catch (err) {
        console.log(err);
    }
}

// Callback function to delete cart item route

const deleteCartItem = async (req, res) => {
    try {
        const sessionID = req.sessionID;        
        const {cartItemId} = req.params;
        await deleteCartItemQuery(cartItemId, sessionID);
    } catch (err) {
        console.log(err)
    }
}

//Function to update cart item quantity 

const updateCartItemQuantityQuery = async (quantity, cartItemId, sessionID) => {
    try {
        const SQL = 'UPDATE cart_items SET quantity=$1 WHERE id=$2 AND session_id=$3'
        await pool.query(SQL, [quantity, cartItemId, sessionID]);
        const updatedCartItem = await getCartItem(cartItemId);
        return updatedCartItem
    } catch (err) {
        console.log(err)
    }
}

// Callback function to update cart item quantity route

const updateCartItemQuantity = async (req, res) => {
    try {
        const sessionID = req.sessionID;
        const {cartItemId} = req.params;
        const { quantity } = req.body
        await updateCartItemQuantityQuery(quantity, cartItemId, sessionID);
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAllCartItems, getCartItem, addCartItem, deleteCartItem, updateCartItemQuantity }
