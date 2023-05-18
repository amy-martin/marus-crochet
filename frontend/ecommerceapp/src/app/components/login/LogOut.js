import React from "react";
import { useNavigate } from "react-router-dom"
import { setToLoggedOut } from "./loginSlice";
import { useDispatch } from "react-redux";


export const LogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        fetch('http://localHost:3000/user/logout')
        .then(dispatch(setToLoggedOut()))
        .then(navigate('/'))
    }

    return (
        <a onClick={handleClick} className="log-out-button"><h4>LOG OUT</h4></a>
    )
}