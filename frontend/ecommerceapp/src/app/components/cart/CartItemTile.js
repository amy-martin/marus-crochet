import React, { useEffect, useState } from "react";
import { QuantityUpdateInput } from "./QuantityUpdateInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemTotalPrice, selectCartItemTotalPrices } from "./slice/cartItemTotalPriceSlice";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";

export const CartItemTile = (props) => {
    const dispatch = useDispatch()
    const shoppingSessionID = useSelector(selectShoppingSessionID)
    const {item} = props;
    const {image1_url, quantity, name, product_id: productId} = item;
    const productTotalPrices = useSelector(selectCartItemTotalPrices);
    
    const productTotalPrice = productTotalPrices[productId]
    useEffect(() => {
        dispatch(fetchCartItemTotalPrice({shoppingSessionID, productId}))
    }, []);
    
    return (
        <div className="cart-item-tile-container">
           <img src={image1_url}></img>
           <div className="cart-item-info">
                <h4>{name}</h4>
                <QuantityUpdateInput productId={productId} quantity = {quantity}/>
                <h4>{productTotalPrice}</h4>
           </div>
        </div>
    )

}