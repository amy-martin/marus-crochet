const { pool } = require('../../db/server.js');
const { getAllCartItems } = require('./cartHelpers.js');

// Function to validate if cart exists (Retrieve cart id from session?)
const cartExists = (req,res) => {
    try {
        const cartItems =  getAllCartItems;
        if (cartItems[0].length > 0) {
            return true
        } else return false   
    } catch(err) {
        console.log(err);
    }
}
// Function to process payment
const paymentProcessed = () => {
    let paymentId
    return paymentId
    // Will add payment functionality later
}

// Function to add order to order details table in database //Get user_id from session
const addOrderDetailsQuery = async (sessionID, user_id, total, payment_id) => {
    try {
        const insertSQL = 'INSERT INTO orders_details (user_id, total, payment_id) VALUES ($1, $2, $3)';
        let orderId
        await pool.query(insertSQL, [user_id, total, payment_id]).then(res => {
            orderId = res.rows[0].id
        });
        addOrderItemsQuery(sessionID, orderId)
        return orderId
        
    } catch (err) {
        console.log(err)
    }
}
// Need to get all the items from the cart where ussr i = iser id and then 
// Function to add each item to order items table // Figure out how to get order items from cart
const addOrderItemsQuery = async (session_id, order_id) => {
    try {
        const selectSQL = 'SELECT * FROM cart WHERE session_id=$1'
        const orderList = await pool.query(selectSQL, [session_id]).rows
        const SQL = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)'
        orderList.map(async order => await pool.query(SQL, [order_id, order.product_id, order.quantity]) )
    } catch (err) {
        console.log(err);
    }
}


const checkoutCart = async (req, res) => {
    try {
        const {sessionID, userID} = req;
        const {total, paymentId, orderId} = req.body;

        if (cartExists) {
            if (paymentProcessed) {
                await addOrderDetailsQuery(sessionID, userID, total, paymentId)
            }
        }
    } catch (err) {
        console.log(err);
    }
};


module.exports = { checkoutCart }