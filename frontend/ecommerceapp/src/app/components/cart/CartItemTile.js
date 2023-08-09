import React, { useEffect, useState } from "react";
import { QuantityUpdateInput } from "./QuantityUpdateInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemTotalPrice, selectCartItemTotalPrices } from "./slice/cartItemTotalPriceSlice";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";
import { fetchCartQuantity, selectCartQuantity } from "./slice/cartSlice";
import { useNavigate } from "react-router-dom";

export const CartItemTile = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartQuantity = useSelector(selectCartQuantity)
    const shoppingSessionID = useSelector(selectShoppingSessionID)
    const {item} = props;
    const {image1_url, quantity, name, product_id: productId} = item;
    const productTotalPrices = useSelector(selectCartItemTotalPrices);
    const productTotalPrice = productTotalPrices[productId];
    const [display, setDisplay] = useState('flex');

    const handleClick = () => {
        const fetchDeleteItem = async () => {
            try{
                const cartItemDeleteRequestOptions = {
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                        }
                    }
                fetch(`http://localHost:3000/cart/${shoppingSessionID}/delete/${productId}`, cartItemDeleteRequestOptions)
                .then(res => {
                    if (res.ok) {
                        (setDisplay('none'))
                        dispatch(fetchCartQuantity(shoppingSessionID));
                        if (cartQuantity === 0) {
                            navigate('/cart', {replace: true})
                        }
                    }
                })
                
            } catch (e) {
                throw e
            }
        }
        fetchDeleteItem();
    }


    useEffect(() => {
        dispatch(fetchCartItemTotalPrice({shoppingSessionID, productId}))
    }, []);
    
    return (
        <div className="cart-item-tile-container" style={{display:`${display}`}}>
           <img src={image1_url}></img>
           <div className="cart-item-info">
                <h4 className="cart-item-info-piece">{name}</h4>
                <QuantityUpdateInput productId={productId} quantity = {quantity} className='cart-item-info-piece'/>
                <h4 className="cart-item-info-piece">{productTotalPrice}</h4>
                <button className='delete-cart-item cart-item-info-piece"' onClick={handleClick}>Delete</button>
           </div>
        </div>
    )

}