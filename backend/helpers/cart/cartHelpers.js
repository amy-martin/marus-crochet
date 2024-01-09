const { pool } = require('../../db.js');


// Function to retrieve all cart items
const getAllCartItemsQuery = async (shoppingSessionID) => {
    try {
        const SQL = 'SELECT ci.id AS cart_item_id, ci.session_id, ci.product_id, ci.quantity, p.name, p.desc, p.price AS product_price, p.image1_url, p.price, ci.quantity * p.price AS product_total_price FROM cart_items ci JOIN products p on ci.product_id = p.id WHERE ci.session_id = $1'
        const cart = await pool.query(SQL, [shoppingSessionID]);
        return cart.rows;
    } catch (err) {
        console.log('Error in getAllCartItemsQuery')
        console.log(err);
    }
};

// Callback function to get all cart items route
const getAllCartItems = async (req, res) => {
    try {
        const {shoppingSessionID} = req.params;
        const cartItems = await getAllCartItemsQuery(shoppingSessionID);
        return res.status(200).json({cartItems})
    } catch (err) {
        console.log('Error in getAllCartItems')
        console.log(err)
        return res.status(500).json({message: err})
    }

}
// Function to retrieve cart item by cart

const getCartItemQuery = async (productId, shoppingSessionID) => {
    try {
        const SQL = 'SELECT * FROM cart_items WHERE product_id=$1 AND session_id=$2';
        const cartItem = await pool.query(SQL, [productId, shoppingSessionID]);
        return cartItem.rows[0];
    } catch (err) {
        console.log('Error in getCartItemQuery')
        console.log(err)
    }
} 

// Callback function to get cart item route
const getCartItem = async (req, res) => {
    try {
        const {shoppingSessionID, productId} = req.params;
        const cartItem = await getCartItemQuery(productId, shoppingSessionID);
        return res.status(200).json({cartItem})
    } catch (err) {
        console.log('Error in getCartItem')
        console.log(err)
        return res.status(500).json({message: err})
    }
}


// Function to add to cart by cart id

const addCartItemQuery = async (shoppingSessionID, productId, quantity) => {
    try {
        const SQL = 'INSERT INTO cart_items (session_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT ON CONSTRAINT idx_cart_items_unique_session_product DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity'
        await pool.query(SQL, [shoppingSessionID, productId, quantity]);
    } catch (err) {
        console.log('Error in addCartItemQuery')
        console.log(err);
    }
}

// Callback function to post cart item route

const addCartItem = async (req, res) => {
    try {
        const {shoppingSessionID} = req.params
        const {productId, quantity} = req.body;
        await addCartItemQuery(shoppingSessionID, productId, quantity)
        return res.status(200).json({message: 'Item added'})
    } catch (err) {
        console.log('Error in  addCartItem')
        console.log(err)
        return res.status(500).json({message: err})
    }
};

// Function to remove from cart by cart id and product id

const deleteCartItemQuery = async (productId, shoppingSessionID) => {
    try {
        const SQL = 'DELETE FROM cart_items WHERE product_id=$1 AND session_id=$2';
        await pool.query(SQL, [productId, shoppingSessionID]);

    } catch (err) {
        console.log('Error in deleteCartItemQuery')
        console.log(err);
    }
}

// Callback function to delete cart item route

const deleteCartItem = async (req, res) => {
    try {
        const {shoppingSessionID, productId} = req.params;
        await deleteCartItemQuery(productId, shoppingSessionID);
        return res.status(200).json({message: 'Item deleted from cart'})
    } catch (err) {
        console.log('Error in deleteCartItem')
        console.log(err)
        return res.status(500).json({message: err})
    }
}

const deleteAllCartItemsQuery = async (shoppingSessionID) => {
    try {
        const SQL = 'DELETE FROM cart_items WHERE session_id = $1';
        await pool.query(SQL, [shoppingSessionID])
    } catch (err) {
        console.log('Error in deleteAllCartItemsQuery')
        console.log(err)
    }
}

const deleteAllCartItems = async (req, res) => {
    try {
        const {shoppingSessionID} = req.params
        await deleteAllCartItemsQuery(shoppingSessionID);
        return res.status(200).json({message: 'Cart reset successfully'}) 
    } catch (err) {
        return res.status(500).json({message: err})

    }
}

//Function to update cart item quantity 

const updateCartItemQuantityQuery = async (quantity, productId, shoppingSessionID) => {
    try {
        const SQL = 'UPDATE cart_items SET quantity=$1 WHERE product_id=$2 AND session_id=$3'
        await pool.query(SQL, [quantity, productId, shoppingSessionID]);

        const updatedCartItem = await getCartItemQuery(productId, shoppingSessionID);
        return updatedCartItem.quantity
    } catch (err) {
        console.log('Error in updateCartItemQuantityQuery')
        console.log(err)
    }
}

// Callback function to update cart item quantity route

const updateCartItemQuantity = async (req, res) => {
    try {
        const {shoppingSessionID } = req.params;
        const { quantity, productId } = req.body
        await updateCartItemQuantityQuery(quantity, productId, shoppingSessionID);
        return res.status(200).json({message: 'Quantity updated'})

    } catch (err) {
        console.log('Error in updateCartItemQuantity')
        console.log(err)
        return res.status(500).json({message: err})
    }
}

const getCartQuantityQuery = async (shoppingSessionID) => {
    try {
        const SQL = 'SELECT SUM(quantity) as sum_result FROM cart_items WHERE session_id=$1'
        const cartQuantity = await pool.query(SQL, [shoppingSessionID]);
        return cartQuantity.rows[0];
    } catch (err) {
        console.log('Error in getCartQuantityQuery')
        console.log(err);
    }
}
const getCartTotalQuery = async (shoppingSessionID) => {
    try {
        const SQL ='SELECT SUM(p.price * ci.quantity) AS total_cost FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.session_id=$1';
        const cartTotal = await pool.query(SQL, [shoppingSessionID]);
        return cartTotal.rows[0];
    } catch (err) {
        console.log('Error in getCartTotalQuery')
        console.log(err)
    }
}
const getCartSumDetails = async (req, res) => {
    try {
        const {shoppingSessionID} = req.params;
        const quantityQueryRes = await getCartQuantityQuery(shoppingSessionID);
        const cartQuantity = quantityQueryRes ? quantityQueryRes.sum_result: 0;
        const totalQueryRes = await getCartTotalQuery(shoppingSessionID);
        const cartTotal = totalQueryRes ? totalQueryRes.total_cost: 0;
        return res.status(200).json({cartQuantity, cartTotal})
    } catch (err) {
        console.log('Error in getCartSumDetails')
        console.log(err)
        return res.status(500).json({message: err})        
    }
}

const getCartItemTotalPriceQuery = async (shoppingSessionID, productId) => {
    try {

        const SQL = 'SELECT ci.quantity * p.price AS product_total_price FROM cart_items ci JOIN products p on ci.product_id = p.id WHERE ci.session_id = $1 AND ci.product_id = $2';
        const cartItemTotalPrice = await pool.query(SQL, [shoppingSessionID, productId]);
        return (cartItemTotalPrice && cartItemTotalPrice.rows[0]) ? cartItemTotalPrice.rows[0].product_total_price : null
    } catch (err) {
        console.log('Error in getCartItemTotalPriceQuery')
        console.log(err)
    }
}

const getCartItemTotalPrice = async (req, res) => {
    try {
        const {shoppingSessionID, productId} = req.params;

        const cartItemTotalPrice = await getCartItemTotalPriceQuery(shoppingSessionID, productId);
        return res.status(200).json({cartItemTotalPrice});
    } catch(err) {
        console.log('Error in getCartItemTotalPrice')
        console.log(err)
        return res.status(500).json({message: err})
    }
}

module.exports = { getAllCartItems, getCartItem, addCartItem, deleteCartItem, updateCartItemQuantity, getCartSumDetails, getCartItemTotalPrice, deleteAllCartItemsQuery, deleteAllCartItems }
