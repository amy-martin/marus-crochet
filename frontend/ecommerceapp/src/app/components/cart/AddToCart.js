import { React } from 'react';
import { QuantityInput } from './QuantityInput';
import { AddToCartButton } from './AddToCartButton';

export const AddToCart = () => {
    return (
        <div className="add-to-cart">
            <QuantityInput />
            <AddToCartButton />
        </div>
    )
}