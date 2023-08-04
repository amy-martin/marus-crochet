import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectisLoggedIn } from "../login/loginSlice";
import { LogOut } from '../login/LogOut'
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice";
import { selectCartQuantity, setInitialCartQuantity } from "../cart/slice/cartSlice";

export const UserSpecificNavOptions = () => {
    const isLoggedIn = useSelector(selectisLoggedIn);
    const cartQuantity = useSelector(selectCartQuantity)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoggedInClick = (e) => {
        e.preventDefault();
        navigate('cart')
    }
    
    const handleLoggedOutClick = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login', {state:{flash: true, flashMessage: 'Please log in before continuing', backgroundColor: 'rgba(216,80,39, 0.7)'}, replace: true});
        }
    }
    
    const loggedInDisplay = (
        <ul className="user-specific-options">
            <li>
                <h4><NavLink to='/profile'>ACCOUNT </NavLink></h4>
            </li>
            <li>
                <h4><a onClick={handleLoggedInClick} href="/"> CART ({cartQuantity}) </a></h4>
            </li>
            <li>
                <LogOut />
            </li>

        </ul>
    )

    const loggedOutDisplay = (
        <ul className="user-specific-options">
            <li>
                <h4><a href="/login">LOG IN / SIGN UP</a></h4>
            </li>
            <li>
                <h4><a onClick={handleLoggedOutClick}>CART</a></h4>
            </li>
        </ul>
    )
    
    return (
        <div className="user nav-component">
           {isLoggedIn ? loggedInDisplay: loggedOutDisplay} 
        </div>
        
    )
}