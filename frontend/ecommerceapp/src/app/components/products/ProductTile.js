import React from "react";

export const ProductTile = (props) => {
    const {imageURL} = props
    return (
        <div className="product-tile-container">
            <img src={imageURL} className="product-tile"/>
        </div>
    )
}