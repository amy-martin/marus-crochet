import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { serverAddress } from "../../App";
import { setItemsToSend, setTotalToSend } from "../order/slice/orderSlice";



export const CheckoutButton = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate();
    const {cartItems} = props
    const handleClick = async () => {
        try {
            const options = {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({cartItems, userId: user.id})
            }
            const url = `${serverAddress}/checkout/create-checkout-session`;
            const response = await fetch(url, options);
            const responseJSON = await response.json()
        
            
            if (responseJSON && responseJSON.url) {
              window.location.href = responseJSON.url
            }
                    
        } catch (err) {
            throw err
        }
    }

    return (
        <button className='checkout-button' onClick={handleClick}>Checkout</button>
    )
}