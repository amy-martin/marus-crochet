import React from "react";
export const QuantityInput = () => {
    

    return (
        <div className="quantity-input-container">
            <h4>Quantity:</h4>
            <input className="quantity" type='number'  placeholder="1" min="1"></input>
        </div>
    )
}