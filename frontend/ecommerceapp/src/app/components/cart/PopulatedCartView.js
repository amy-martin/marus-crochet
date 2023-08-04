import React from "react";
import { CartItemTile } from "./CartItemTile";

export const PopulatedCartView = (props) => {
    const {cartItems} = props;

    return (
        <div className="cart-items-container">
            {cartItems.map((item) => <CartItemTile item={item} key={item.product_id}/>)}
        </div>

        // MAP OUT CART ITEMS RETURNED BY DATABASE CALL TO CART ITEMS


        // HAVE DELETE ITEM BUTTON TO DELETE ITEM FROM CART FOR EACH ITEM 


        // HAVE DELETE ALL BUTTON TO MAKE FETCH CALL TO DELETE ALL


        // HAVE EDIT QUANTITY BUTTON
    )

}