import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkState } from "../../helpers/miscellaneous";
import { retrieveNewProducts } from "../../helpers/products";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";

export const NewProductListing = () => {
    const [productList, setProductList] = useState('Loading');

    useEffect(() => {
        retrieveNewProducts().then(products => {
            setProductList(Array.isArray(products) ? products : 'Failed to Load')
        })
    }, []);

    const productListMapping = (list) => {
        return list.map((product) => {
            return (
                <Link to={`/product/${product.id}`} className='product-listing' key={product.id}>
                    <ProductImage imageURL={product.image1_url} key={product.id}/>
                    <ProductInfo product = {product} />
                </Link>
            )
        })
    }


    return ( 
        <div className="products-page">
            <h2>OUR NEWEST ADDITIONS</h2>
            <div className={`product-list-container new`}>
                {checkState(productList) ? checkState(productList): productListMapping(productList)}
            </div>
        </div>

    )
}
