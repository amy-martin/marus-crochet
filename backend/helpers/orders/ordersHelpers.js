const { pool } = require('../../db.js');


const addOrderQuery = async (userID, total, paymentId, orderItems) => {
    try {
        let orderDetails
        const orderItemsJSON = JSON.stringify(orderItems)
        const SQL = 'INSERT INTO orders (user_id, total, payment_id, order_items) VALUES ($1, $2, $3, $4) RETURNING *'
        return await pool.query(SQL, [userID, total, paymentId, orderItemsJSON])
    } catch (err) {
        throw err
    }
}



const addOrder = async (req, res) => {
    try {
        const {userID, total, paymentID, orderItems} = req.body
        const result = await addOrderQuery(userID, total, paymentID, orderItems) ;
        
        console.log(result)
        // ADD ORDER TO JSON ONCE YOU KNOW WHAT IT RETURNS
        return res.status(200).json({orderInfo: result.rows[0]})
    } catch (err) {
        return res.status(500).json({message: err})
    }
}


const getAllOrdersQuery = async (user_id) => {
    try {
        const SQL = 'SELECT * FROM orders WHERE user_id = $1';
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
        // res.send SOMETHING
    } catch (err) {
        console.log(err)
    }
}

const getOrderDetailsByIdQuery = async (user_id, order_id) => {
    try {
        const SQL = 'SELECT * FROM orders WHERE payment_id=$1 AND user_id=$2'
        const orderDetails = await pool.query(SQL, [order_id, user_id])
        return orderDetails.rows[0]
    } catch (err) {
        console.log(err);        
    }
}



const getOrderById = async (req, res) => {
    try {
        const {id, userID} = req.params
       
        // RES.SEND SOMETHING
    } catch (err) {
        console.log(err)
    }
}



module.exports = {addOrderQuery, getAllOrders, addOrder}