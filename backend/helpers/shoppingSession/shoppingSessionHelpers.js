const { pool } = require('../../db.js');

const addShoppingSession = async (req, res) => {
    try {
        // const sessionID = req.sessionID;
        // const userID = req.user.id
        const SQL = 'INSERT INTO shopping_session (user_id) VALUES ($1)';
        await pool.query(SQL, [req.user.id])
        return res.status(200).json({message: 'Shopping session successfully started'})
    } catch (err) {
        console.log(err)
    }
}

const deleteShoppingSession = async (req, res) => {
    try {
        const sessionID = req.sessionID;
        const userID = req.userID;
        const SQL = 'DELETE FROM shopping_session WHERE id=$1 AND user_id=$2';
        await pool.query(SQL, [sessionID, userID])
    } catch (err) {
        console.log(err)
    }
}

module.exports = {addShoppingSession, deleteShoppingSession}