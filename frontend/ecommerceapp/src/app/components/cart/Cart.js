import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopulatedCartView } from "./PopulatedCartView";
import { Loading } from "../miscellaneous/Loading";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";
import { Flash } from "../miscellaneous/flash/Flash";
import { displayFlash } from "../miscellaneous/flash/flashSlice";
import { useLocation } from "react-router-dom";
import { fetchCartItemTotalPrice } from "./slice/cartItemTotalPriceSlice";


export const Cart = () => {
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState('Loading')
    const shoppingSessionID = useSelector(selectShoppingSessionID);

    const fetchCartItems = async () => {
        try {
            const cartItemsRequestOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
                }
            }
            await fetch(`http://localHost:3000/cart/${shoppingSessionID}`, cartItemsRequestOptions)
            .then(res => {
                return res.json()
            }).then(res => {
                setCartItems(res.cartItems);

            })
        } catch (e) {
            console.log(e.message)
            setCartItems('Failed')
            throw e
        }
    }

    useEffect(() => {

        if (shoppingSessionID) {
            fetchCartItems()
        }
        
    }, [shoppingSessionID])

    const statusCheck = () => {
        if (cartItems === 'Loading') {
            return <Loading />
        } else if (cartItems !== 'Failed') {
            if (cartItems.length > 0) {
                return <PopulatedCartView cartItems={cartItems}/>
            } else {
                return <h2>Cart is empty</h2>
            }
        } else if (cartItems === 'Failed') {
            return <h2>Oops! Something went wrong. Please reload or try again later</h2>
        }
    }


    return (
        <div className="cart-container">
            {statusCheck()}
        </div>
    )

    
}