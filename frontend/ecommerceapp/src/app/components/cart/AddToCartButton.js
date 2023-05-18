import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectisLoggedIn } from "../login/loginSlice";
import { useNavigate } from "react-router-dom";

export const AddToCartButton = () => {
    const isLoggedIn = useSelector(selectisLoggedIn)
    const navigate = useNavigate();
    const handleClick = () => {
        if (!isLoggedIn) {
            navigate('/login', {state: {flash: true}})
        }
        
    }
    return (
        <button onClick={handleClick}>Add To Cart</button>
    )
}