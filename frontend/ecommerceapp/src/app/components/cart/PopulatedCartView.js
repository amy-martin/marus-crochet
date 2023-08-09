import React from "react";
import { CartItemTile } from "./CartItemTile";

export const PopulatedCartView = (props) => {
    const {cartItems} = props;

    return (
        <div className="cart-items-container">
            {cartItems.map((item) => <CartItemTile item={item} key={item.product_id}/>)}
        </div>
    )
}