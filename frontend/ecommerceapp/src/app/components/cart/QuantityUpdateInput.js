import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";
import { fetchCartQuantity } from "./slice/cartSlice";
import { quantityDropdown } from "../../helpers/miscellaneous";
import { useNavigate } from "react-router-dom";
import { fetchCartItemTotalPrice } from "./slice/cartItemTotalPriceSlice";

export const QuantityUpdateInput = (props) => {
    const {productId, quantity, className} = props;

    const shoppingSessionID = useSelector(selectShoppingSessionID)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSelect = e => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    productId,
                    quantity: e.target.value
                })
            };
            fetch(`http://localHost:3000/cart/${shoppingSessionID}/updateQuantity`, requestOptions)
            .then(async res => {
                if (res.status === 200) {
                    dispatch(fetchCartQuantity(shoppingSessionID));
                    dispatch(fetchCartItemTotalPrice({shoppingSessionID, productId}))
                    const response = await res.json();     
                    navigate('/cart', {state: {flash: true, flashMessage: response.message, backgroundColor: 'rgba(0, 117, 0, 0.7)'}, replace: true})
                }
            })
        } catch (e) {
            throw e
        }
    }
    return (
        <div className={`cart-quantity-input-container ${className? className: null}`}>
            {quantityDropdown(handleSelect, quantity)}
        </div>

    )
}