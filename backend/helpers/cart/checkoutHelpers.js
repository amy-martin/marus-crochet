const { pool } = require('../../db.js');
const dotenv = require('dotenv');
dotenv.config();
const Stripe = require("stripe");
const { addOrderQuery } = require('../orders/ordersHelpers.js');
const { deleteShoppingSessionQuery } = require('../shoppingSession/shoppingSessionHelpers.js');
const { deleteAllCartItemsQuery } = require('./cartHelpers.js');
const clientSecret = process.env.SECRET_STRIPE_KEY
const endpointSecret = process.env.ENDPOINT_SECRET
const stripe = Stripe(clientSecret)


// Stripe API funtionality


const createCheckoutSession = async (req, res) => {
    try {
        const {user} = req
        const {shoppingSessionID} = req.params
        //REMEMBER TO SEND THESE ITEMS ON THE FRONT END
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
            //MAKE SURE TO LOG USERS IN
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cart`
        });
        await res.json({ url: session.url, user });
        
    } catch (err) {
        throw err
    }

}


const fulfillOrder = (
    // userID, total, paymentId, 
    orderItems) => {
}
 
const webhookHandler = async (req, res) => {
    const payload =  req.body;
    const sig = req.headers['stripe-signature'];

    let event;
    
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
        throw err
    }

    if (event.type === 'checkout.session.completed') {
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,

            {expand: ['line_items']}
        );
        const lineItems = sessionWithLineItems.line_items;
        fulfillOrder(lineItems)
    }
    res.status(200).end()
}

module.exports = {createCheckoutSession}













































































