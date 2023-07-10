import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectisLoggedIn } from "../login/loginSlice";
import { useNavigate } from "react-router-dom";
import { displayFlash } from "../miscellaneous/flash/flashSlice";

export const AddToCartButton = (props) => {
    const {productId, quantity} = props
    const isLoggedIn = useSelector(selectisLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
            dispatch(displayFlash({flashMessage: 'Please log in before continuing', backgroundColor: 'rgba(216,80,39, 0.7)'}))
        }
        else {
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    productId,
                    quantity
                })
            };
            try {
                fetch('http://localHost:3000/cart', requestOptions)
                .then(async res => {
                    const response = await res.json();
                    return response
                })
            } catch(e) {
                throw e
            }
            // ADD TO CART FETCH REQUEST

            // Cart view will retrieve database cart data and trotal shown in cart quantity willl 
            // reflect cart item count not item count
            // TOTAL SHOULD BE SUM OF ITEMS RETRIEVED FROM DATABASE // COULD USE ASYNC THUNK TO STORE STATE OR JUST MAKE INDIVIDUAL CALL IN CART VIEW
            // Remember to change this
        }
        
    }
    return (
        <button onClick={handleClick}>Add To Cart</button>
    )
}