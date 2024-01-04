import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";
import { fetchCartSums } from "./slice/cartSlice";
import { quantityDropdown } from "../../helpers/miscellaneous";
import { useNavigate } from "react-router-dom";
import { fetchCartItemTotalPrice } from "./slice/cartItemTotalPriceSlice";
import { serverAddress } from "../../App";
import { QuantityDropdown } from "../miscellaneous/QuantityDropdown";

export const QuantityUpdateInput = (props) => {
    const { productId, quantity, className } = props;

    const shoppingSessionID = useSelector(selectShoppingSessionID);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state to track the selected quantity
    const [selectedQuantity, setSelectedQuantity] = useState(quantity);

    const handleSelect = async (e) => {
        e.preventDefault();
        const newQuantity = e.target.value;

        try {
            const requestOptions = {
                method: "PUT",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    quantity: newQuantity,
                }),
            };

            const response = await fetch(
                `${serverAddress}/cart/${shoppingSessionID}/updateQuantity`,
                requestOptions
            );

            if (response.status === 200 && shoppingSessionID) {
                dispatch(fetchCartSums(shoppingSessionID));
                dispatch(fetchCartItemTotalPrice({ shoppingSessionID, productId }));
                setSelectedQuantity(newQuantity); // Update local state
                const responseData = await response.json();
                navigate("/cart", {
                    state: {
                        flash: true,
                        flashMessage: responseData.message,
                        backgroundColor: "rgba(0, 117, 0, 0.7)",
                    },
                    replace: true,
                });
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    return (
        <div className={`cart-quantity-input-container ${className ? className : null}`}>
            {<QuantityDropdown handleSelect={handleSelect} selectedQuantity={selectedQuantity}/>}
        </div>
    );
};
