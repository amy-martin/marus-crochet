import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopulatedCartView } from "./PopulatedCartView";
import { Loading } from "../miscellaneous/Loading";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";
import { Link } from "react-router-dom";
import { fetchCartItems, selectCartItems, selectCartItemsStatus, selectCartQuantity } from "./slice/cartSlice";
import { CheckoutButton } from "./CheckoutButton";



export const Cart = () => {
    const dispatch = useDispatch();
    const shoppingSessionID = useSelector(selectShoppingSessionID);
    const cartQuantity = useSelector(selectCartQuantity);
    const cartItems = useSelector(selectCartItems);
    const cartItemsStatus = useSelector(selectCartItemsStatus)
    const [isPopulated, setIsPopulated] = useState(false)



    useEffect(() => {
        if (shoppingSessionID) {
            dispatch(fetchCartItems(shoppingSessionID));
        }
    }, [shoppingSessionID, cartQuantity]);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            setIsPopulated(true)
        }
        if (cartItems && cartItems.length === 0) {
            setIsPopulated(false)
        }
    })

    const statusCheck = () => {
        if (cartItemsStatus === 'Loading') {
            return <Loading />
        } else if (cartItemsStatus === 'Successful') {
            if (cartItems && cartItems.length > 0) {
                return <PopulatedCartView cartItems={cartItems}/>
            } else if  (cartItems && cartItems.length === 0) {
                return <h2 className="empty-cart-view">Cart is empty. Click <Link to='/products'>here</Link> to view our entire collection</h2>
            }
        } else if (cartItemsStatus === 'Failed') {
            return <h2 className="error-cart-view">Oops! Something went wrong. Please reload or try again later</h2>
        }
    }


    return (
        <div className="cart-container">
            <h2>SHOPPING CART</h2>
            {statusCheck()}
            {isPopulated ? <CheckoutButton cartItems={cartItems}/>: null}
            <div className="disclaimer">

                <h4>REGARDING CREDIT CARD INFORMATION:</h4>

                <p>Pressing checkout will navigate you to a page prompting for credit card information. Please be aware that this is solely part of the demonstration. Do not enter any real credit card information. For testing purposes, you can use the following trial credit card number:</p>

                <p><strong>Card Number:</strong> 4242 4242 4242 4242</p>
                <p><strong>Expiration Date:</strong> Any future date</p>
                <p><strong>CVC:</strong> Any three-digit number</p>

                <p>Again, this site does not process real transactions, and any information you provide is for demonstration purposes only. Thank you for your understanding.</p>

                <p id='home-page-bottom'>If you have any questions or concerns, feel free to contact me at <a href="mailto:amymartinm97@gmail.com">amymartinm97@gmail.com</a>.</p>



            </div>
        </div>
    )

    
}