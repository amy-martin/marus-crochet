import { React, useState } from 'react';
import { AddToCartButton } from './AddToCartButton';
import { QuantityDropdown } from '../miscellaneous/QuantityDropdown';
export const AddToCart = (props) => {
    const {productId} = props;
    const [productQuantity, setProductQuantity] = useState(1)
    const handleSelect = e => {
        e.preventDefault();
        setProductQuantity(e.target.value)
    }
    return (
        <div className="add-to-cart">
            {<QuantityDropdown handleSelect={handleSelect} />}
            <AddToCartButton productId={productId} quantity={productQuantity}/>
        </div>
    )
}
