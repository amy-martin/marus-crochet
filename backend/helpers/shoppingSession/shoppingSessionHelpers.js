const { pool } = require('../../db.js');

const addShoppingSession = async (req, res) => {
    try {
        const SQL = 'INSERT INTO shopping_session (user_id) SELECT ($1) WHERE NOT EXISTS ( SELECT  1 FROM shopping_session WHERE user_id = ($1))';
        await pool.query(SQL, [req.user.id])
        return res.status(200).json({message: 'Shopping session successfully started'})
    } catch (err) {
        console.log('Error in addShoppingSession')
        console.log(err)
    }
}

const getShoppingSessionId = async (req, res) => {
    try {
        const userID = req.user.id;
        const SQL = 'SELECT id FROM shopping_session WHERE user_id=$1'
        const response = await pool.query(SQL, [userID]);
        
        return res.json({id: response.rows[0].id})
    } catch (err) {
        console.log('Error in getShoppingSessionId')
        console.log(err)
    }
}
const deleteShoppingSessionQuery = async (shoppingSessionID, userID) => {
    const SQL = 'DELETE FROM shopping_session WHERE id=$1 AND user_id=$2';
    await pool.query(SQL, [shoppingSessionID, userID])

};


module.exports = {addShoppingSession, deleteShoppingSessionQuery, getShoppingSessionId}
