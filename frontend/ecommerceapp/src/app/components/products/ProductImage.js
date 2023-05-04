import React from "react";

export const ProductImage = (props) => {
    const {imageURL} = props
    return (
        <div className="product-image-container">
            <img src={imageURL} className="product-image"/>
        </div>
    )
}