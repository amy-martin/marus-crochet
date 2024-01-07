import React, { useEffect, useState } from "react";
import { QuantityUpdateInput } from "./QuantityUpdateInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemTotalPrice, selectCartItemTotalPrices } from "./slice/cartItemTotalPriceSlice";
import { selectShoppingSessionID } from "./slice/shoppingSessionSlice";
import { fetchCartSums, selectCartQuantity } from "./slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { serverAddress } from "../../App";

export const ItemTile = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartQuantity = useSelector(selectCartQuantity)
    const shoppingSessionID = useSelector(selectShoppingSessionID) 
    const {type, item, quantity} = props;
    const {image1_url, name, product_id: productId} = item;
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
                fetch(`${serverAddress}/cart/${shoppingSessionID}/delete/${productId}`, cartItemDeleteRequestOptions)
                .then(res => {
                    if (res.ok) {
                        (setDisplay('none'))
                        if (shoppingSessionID) {
                            dispatch(fetchCartSums(shoppingSessionID));
                        }                        
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
        if (shoppingSessionID && type==='cart-item') {
            dispatch(fetchCartItemTotalPrice({shoppingSessionID, productId}))
        }
    }, []);
    
    return (
        <div className="item-tile-container" style={{display:`${display}`}}>
           <img src={image1_url}></img>
           <div className="item-info">
                <h4 className="item-info-piece name">{name}</h4>
                {type === 'cart-item' ? <QuantityUpdateInput productId={productId} quantity = {quantity} className='item-info-piece'/>: <h4 className="item-info-piece quantity">Quantity: {quantity}</h4>}
                <h4 className="item-info-piece price">{productTotalPrice}</h4>
                {type === 'cart-item' ? <button className='delete-cart-item item-info-piece"' onClick={handleClick}>Delete</button>: null}
           </div>
        </div>
    )

}