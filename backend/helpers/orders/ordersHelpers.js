const { pool } = require('../../db.js');



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
        const userID = req.user.id
        const orders = await getAllOrdersQuery(userID)
        res.status(200).send({orders})
    } catch (err) {
        return res.status(500).json({message: err})
    }
}

const getOrderDetailsByIdQuery = async (orderID, userID) => {
    try {
        const SQL = 'SELECT * FROM orders WHERE id=$1 AND user_id=$2'
        const orderDetails = await pool.query(SQL, [orderID, userID])
        if (orderDetails.rows.length === 0) {
            return null
        }
        return orderDetails.rows[0]
    } catch (err) {
        console.log('Error in getOrderDetailsByPaymentId')
        console.log(err);        
    }
}



const getOrderByOrderId = async (req, res) => {
    try {
        const userID = req.user.id
        console.log('User:')
        console.log(userID)
        const {orderID} = req.params;
        const response = await getOrderDetailsByIdQuery(userID, paymentID)
        res.status(200).json({orderDetails: response})
    } catch (err) {
        return res.status(500).json({message: err})
    }
}



module.exports = {getAllOrders, getOrderByOrderId}