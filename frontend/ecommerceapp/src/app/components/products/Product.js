import React, { useEffect, useState } from "react";
import { retrieveProduct } from "../../helpers/products";
import { useParams } from "react-router-dom";
import { ProductImage } from "./ProductImage";
import { checkState } from "../../helpers/miscellaneous";
import { ProductInfo } from "./ProductInfo";
import { AddToCart } from "../cart/AddToCart";

export const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState('Loading');

    useEffect(() => {
        retrieveProduct(id).then(retrievedProduct => {
        setProduct(retrievedProduct ? retrievedProduct : 'Failed to Load')
        })
        
    }, [id]);

    const successRender = () => {
        return (
            <div className="product">
                <ProductImage imageURL={product.image1_url} />
                <ProductInfo product={product}/>
            </div>

        )

    }

    return (
        <div className="product-container">
            {checkState(product) ? checkState(product): successRender()}
            <AddToCart productId={id}/>
        </div>
    )


}