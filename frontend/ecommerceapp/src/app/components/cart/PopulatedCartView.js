import React from "react";
import { ItemTile } from "./ItemTile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartTotal } from "./slice/cartSlice";

export const PopulatedCartView = (props) => {
    const {cartItems} = props;
    const navigate = useNavigate();
    const cartTotal = useSelector(selectCartTotal)


    return (
        <div className="cart-items-container">
            {cartItems.map((item) => <ItemTile type='cart-item' item={item} quantity={item.quantity} key={item.product_id}/>)}
            <h3 className="cart-subtotal">Cart Subtotal: {cartTotal}</h3>
        </div>

    )
}