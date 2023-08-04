import React from "react";
import { useNavigate } from "react-router-dom"
import { setToLoggedOut } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetCartQuantity, selectCartQuantity } from "../cart/slice/cartSlice";


export const LogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = async () => {
        const logOutRequestOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
                }
            }
        await fetch('http://localHost:3000/user/logout', logOutRequestOptions)
        .then(dispatch(setToLoggedOut()))
        .then(navigate('/'))
    }

    return (
        <a onClick={handleClick} className="log-out-button"><h4>LOG OUT</h4></a>
    )
}