import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopulatedCartView } from "./PopulatedCartView";
import { Loading } from "../miscellaneous/Loading";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";
import { Link, useLocation } from "react-router-dom";
import { fetchCartItems, fetchCartQuantity, selectCartItems, selectCartItemsStatus, selectCartQuantity } from "./slice/cartSlice";


export const Cart = () => {
    const dispatch = useDispatch();
    const shoppingSessionID = useSelector(selectShoppingSessionID);
    const cartQuantity = useSelector(selectCartQuantity);
    const cartItems = useSelector(selectCartItems);
    const cartItemsStatus = useSelector(selectCartItemsStatus)

   



    useEffect(() => {
        if (shoppingSessionID) {
            dispatch(fetchCartItems(shoppingSessionID));
        }
    }, [shoppingSessionID, cartQuantity]);

    // useEffect(() => {
    //     dispatch(fetchCartQuantity(shoppingSessionID))
    // }, [])

    const statusCheck = () => {
        console.log(cartItems)
        if (cartItemsStatus === 'Loading') {
            return <Loading />
        } else if (cartItemsStatus === 'Successful') {
            if (cartItems.length > 0) {
                return <PopulatedCartView cartItems={cartItems}/>
            } else {
                return <h2 className="empty-cart-view">Cart is empty. Click <Link to='/products'>here</Link> to view our entire collection</h2>
            }
        } else if (cartItemsStatus === 'Failed') {
            return <h2>Oops! Something went wrong. Please reload or try again later</h2>
        }
    }


    return (
        <div className="cart-container">
            {statusCheck()}
        </div>
    )

    
}