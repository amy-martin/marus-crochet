import { React, useState } from 'react';
import { QuantityInput } from './QuantityInput';
import { AddToCartButton } from './AddToCartButton';

export const AddToCart = (props) => {
    const {productId} = props;
    const [productQuantity, setProductQuantity] = useState(1)
    return (
        <div className="add-to-cart">
        <div className="quantity-input-container">
            <h4>Quantity:</h4>
            <input className="quantity" type='number'  placeholder="1" min="1" onChange={e => setProductQuantity(e.target.value)}></input>
        </div>
            <AddToCartButton productId={productId} quantity={productQuantity}/>
        </div>
    )
}