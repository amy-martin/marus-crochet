const { pool } = require('../../db.js');

const getAllOrdersQuery = async (user_id) => {
    try {
        const SQL = 'SELECT * FROM order_details WHERE user_id =$1';
        const orders = await pool.query(SQL, [user_id])
        return orders.rows
    } catch (err) {
        console.log(err)
    }
}

const getAllOrders = async (req, res) => {
    try {
        const {user_ID} = req
        await getAllOrdersQuery(user_ID)
    } catch (err) {
        console.log(err)
    }
}

const getOrderDetailsByIdQuery = async (user_id, order_id) => {
    try {
        const SQL = 'SELECT * FROM order_details WHERE id=$1 AND user_id=$2'
        const orderDetails = await pool.query(SQL, [order_id, user_id])
        return orderDetails.rows[0]
    } catch (err) {
        console.log(err);        
    }
}

const getOrderItemsByIdQuery = async (order_id) => {
    try {
        const SQL = 'SELECT * FROM order_items WHERE order_id=$1'
        const orderItems = await pool.query(SQL, [order_id])
        return orderItems.rows
    } catch (err) {
        console.log(err);        
    }
}


const getOrderById = async (req, res) => {
    try {
        const {orderID} = req.params
        const {user_ID} = req;
        await getOrderDetailsByIdQuery(user_ID, orderID);
        await getOrderItemsByIdQuery(orderID)
    } catch (err) {
        console.log(err)
    }
}



module.exports = {getAllOrders, getOrderById}