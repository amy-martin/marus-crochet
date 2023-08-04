import { React, useState } from 'react';
import { AddToCartButton } from './AddToCartButton';
import { quantityDropdown } from '../../helpers/miscellaneous';

export const AddToCart = (props) => {
    const {productId} = props;
    const [productQuantity, setProductQuantity] = useState(1)
    const handleSelect = e => {
        e.preventDefault();
        setProductQuantity(e.target.value)
    }
    return (
        <div className="add-to-cart">
            {quantityDropdown(handleSelect)}
            <AddToCartButton productId={productId} quantity={productQuantity}/>
        </div>
    )
}
