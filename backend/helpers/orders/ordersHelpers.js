const { pool } = require('../../db.js');
const {deleteAllCartItemsQuery} = require('../cart/cartHelpers.js')
const addOrderQuery = async (userID, total, paymentId, orderItems) => {
    try {
        const orderItemsJSON = JSON.stringify(orderItems)
        const SQL = 'INSERT INTO orders (user_id, total, payment_id, order_items) VALUES ($1, $2, $3, $4) ON CONFLICT (payment_id) DO NOTHING RETURNING *;'
        return await pool.query(SQL, [userID, total, paymentId, orderItemsJSON])
    } catch (err) {
        console.log('Error in addOrderQuery')
        console.log(err)
    }
}



const addOrder = async (req, res) => {
    try {

        const {shoppingSessionID, userID, total, paymentID, orderItems} = req.body
        const result = await addOrderQuery(userID, total, paymentID, orderItems) ;
        let order
        
        // IF NEWLY ADDED (NO CONFLICT)
        if (result.rows.length > 0) {
            await deleteAllCartItemsQuery(shoppingSessionID)
            order = result
        } else if (result.rows.length === 0) {
            order = await getOrderDetailsByPaymentIdQuery(userID, paymentID)
        }
        return res.status(200).json({orderDetails: order})
    } catch (err) {
        console.log('Error in addorder')
        console.log(err)
        return res.status(500).json({message: err})
    }
}


const getAllOrdersQuery = async (user_id) => {
    try {
        const SQL = 'SELECT * FROM orders WHERE user_id = $1';
        const orders = await pool.query(SQL, [user_id])
        return orders.rows
    } catch (err) {
        console.log('Error in getAllOrdersQuery')
        console.log(err)
    }
}

const getAllOrders = async (req, res) => {
    try {
        const {user_ID} = req.params
        const orders = await getAllOrdersQuery(user_ID)
        res.status(200).send({orders})
    } catch (err) {
        return res.status(500).json({message: err})
    }
}

const getOrderDetailsByPaymentIdQuery = async (user_id, payment_id) => {
    try {
        const SQL = 'SELECT * FROM orders WHERE payment_id=$1 AND user_id=$2'
        const orderDetails = await pool.query(SQL, [payment_id, user_id])
        return orderDetails.rows[0]
    } catch (err) {
        console.log('Error in getOrderDetailsByPaymentId')
        console.log(err);        
    }
}



const getOrderByPaymentId = async (req, res) => {
    try {
        const {paymentID, userID} = req.params;
        const response = await getOrderDetailsByPaymentIdQuery(userID, paymentID)
        res.status(200).json({orderDetails: response})
    } catch (err) {
        return res.status(500).json({message: err})
    }
}



module.exports = {addOrderQuery, getAllOrders, addOrder, getOrderByPaymentId}