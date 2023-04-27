import React from "react";

export const ProductInfo = (props) => {
    const {productName, price} = props

    return (
        <div className="product-tile-info">
            <h3>{productName}</h3>
            <h5>${price}</h5>
        </div>
    )
}