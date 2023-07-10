import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectisLoggedIn } from "../login/loginSlice";
// import { selectCartQuantity } from "../cart/slice/cartSlice";
import { LogOut } from '../login/LogOut'
import { displayFlash, hideFlash, selectFlashConfig } from "../miscellaneous/flash/flashSlice";

export const UserOptions = () => {
    const isLoggedIn = useSelector(selectisLoggedIn)
    // const quantity = useSelector(selectCartQuantity)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const flash = useSelector(selectFlashConfig)

    // useEffect(() => {
    //     return () => {
    //         if (flash.display === 'flex') {
    //             dispatch(hideFlash)
    //         }
    //     }
    // });
    
    const handleLoggedOutClick = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login');
            dispatch(displayFlash({flashMessage: 'Please log in before continuing', backgroundColor: 'rgba(216,80,39, 0.7)'}))
        }
    }
    
    const loggedInDisplay = (
        <ul className="user-specific-options">
            <li>
                <h4><Link to='/profile'>ACCOUNT </Link></h4>
            </li>
            <li>
                {/* LINK TO CART VIEW */}
                <h4 Link to="">CART (0)</h4>
            </li>
            <li>
                <LogOut />
            </li>

        </ul>
    )

    const loggedOutDisplay = (
        <ul className="user-specific-options">
            <li>
                <h4><Link to="/login">LOG IN / SIGN UP</Link></h4>
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