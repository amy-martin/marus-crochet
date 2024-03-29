import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectisLoggedIn } from "../login/loginSlice";
import { useNavigate } from "react-router-dom";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";
import { fetchCartSums } from "./slice/cartSlice";
import { Flash } from "../miscellaneous/flash/Flash";
import { displayFlash } from "../miscellaneous/flash/flashSlice";
import { serverAddress } from "../../App";

export const AddToCartButton = (props) => {
    const {productId, quantity} = props
    const isLoggedIn = useSelector(selectisLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const shoppingSessionID = useSelector(selectShoppingSessionID);

    
    const handleClick = () => {
        if (!isLoggedIn) {
            navigate('/login', {state:{flash: true, flashMessage: 'Please log in before continuing', backgroundColor: 'rgba(216,80,39, 0.7)'}, replace: true});
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
                fetch(`${serverAddress}/cart/${shoppingSessionID}`, requestOptions)
                .then(async res => {
                    if (res.status === 200) {
                        if (shoppingSessionID) {
                            dispatch(fetchCartSums(shoppingSessionID));
                            const response = await res.json();
                            dispatch(displayFlash({flashMessage: response.message, backgroundColor: 'rgba(0, 117, 0, 0.7)', className:'add-to-cart-flash'}))
    
                        }
                    }
                });
            } catch(e) {
                throw e
            }

        }
        
    }
    return (
        <section className="button-container">
            <button onClick={handleClick}>Add To Cart</button> 
            <Flash />
        </section>
    )
}