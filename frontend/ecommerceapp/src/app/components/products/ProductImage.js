import React from "react";

export const ProductImage = (props) => {
    const {imageURL, className} = props
    return (
        <div className={`product-image-container ${className}`}>
            <img src={imageURL} className={`product-image`}/>
        </div>
    )
}