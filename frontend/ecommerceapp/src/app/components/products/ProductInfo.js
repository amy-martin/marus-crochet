import React from "react";

export const ProductInfo = (props) => {
    const {product} = props
    const {name, price} = product

    return (
        <div className="product-info">
            <h3>{name}</h3>
            <h5>${price}</h5>
        </div>
    )
}