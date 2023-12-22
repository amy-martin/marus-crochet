const { pool } = require('../../db.js');
const dotenv = require('dotenv');
dotenv.config();
const Stripe = require("stripe");

const clientSecret = process.env.SECRET_STRIPE_KEY
const endpointSecret = process.env.ENDPOINT_SECRET
const stripe = Stripe(clientSecret)

// Stripe API funtionality


const createCheckoutSession = async (req, res) => {
    try {
        const {user} = req;
        const {cartItems, total} = req.body
        let line_items = []
        cartItems.map(cartItem => line_items.push(
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: cartItem.name,
                        images: [cartItem.image1_url],
                        metadata: {
                            id: cartItem.id
                        }
                    },
                    unit_amount: (Number((cartItem.price).replace(/[^0-9.-]+/g,""))) * 100
                },
                quantity: cartItem.quantity
    
            }
            ) )
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `https://maru-crochet-fe.onrender.com/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`https://maru-crochet-fe.onrender.com/cart`,
            metadata: {
                userID: user.id
            }
        });
        await res.json({ url: session.url, user, cartItems, total });
        
    } catch (err) {
        throw err
    }

}






const addOrderQuery = async (orderID, userID, total, paymentId, orderItems) => {
    try {
        const orderItemsJSON = JSON.stringify(orderItems)
        const SQL = 'INSERT INTO orders (id, user_id, total, payment_id, order_items) VALUES ($1, $2, $3, $4) ON CONFLICT (payment_id) DO NOTHING RETURNING *;'
        return await pool.query(SQL, [orderID, userID, total, paymentId, orderItemsJSON])
    } catch (err) {
        console.log('Error in addOrderQuery')
        console.log(err)
    }
}
const saveOrderToDatabase = async (session) => {
    
    try {  
        const userID = session.metadata.userID
        const orderID = session.id;
        const total = session.amount_total;
        const orderItems = session.display_items
        const paymentID = session.payment_intent

        const order = await addOrderQuery(orderID, userID, total, paymentID, orderItems)
        return res.status(200).json({orderDetails: order})
    } catch (err) {
        console.log('Error in saveOrderToDatabase')
        console.log(err)
        return res.status(500).json({message: err})

    }
}
const webhookHandler = async (req, res) => {
    const payload =  req.body;
    const sig = req.headers['stripe-signature'];

    let event;
    
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        saveOrderToDatabase(session)
    }
    res.status(200).json({received: true})
}
module.exports = {createCheckoutSession, webhookHandler}













// WOINT RETRIEVE ORDER DETAILS FROM WHAT WAS LATEST BUT FROM THE DATABSE USING WEBHOOK ID
































































