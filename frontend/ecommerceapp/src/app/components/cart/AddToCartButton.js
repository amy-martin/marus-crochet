import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectisLoggedIn } from "../login/loginSlice";
import { useNavigate } from "react-router-dom";

export const AddToCartButton = () => {
    const isLoggedIn = useSelector(selectisLoggedIn)
    const navigate = useNavigate();
    const handleClick = () => {
        if (!isLoggedIn) {
            navigate('/login', {state: {flash: true, flashMessage: 'Please log in before continuing'}})
        }
        else {
            // ADD TO CART FETCH REQUEST

            // Cart view will retrieve database cart data and trotal shown in cart quantity willl 
            // reflect cart item count not item count
            
            // Remember to change this
            fetch()
        }
        
    }
    return (
        <button onClick={handleClick}>Add To Cart</button>
    )
}