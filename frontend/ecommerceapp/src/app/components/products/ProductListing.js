import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { checkState } from "../../helpers/miscellaneous";
import { retrieveProducts } from "../../helpers/products";
import { ProductTile } from "./ProductTile";
import { ProductInfo } from "./ProductInfo";

export const ProductListing = () => {
    const {category} = useParams();
    const [productList, setProductList] = useState('Loading');

    useEffect(() => {
        retrieveProducts(category).then(products => {
            setProductList(Array.isArray(products) ? products : 'Failed to Load')
        })
    }, [category]);

    const productListMapping = (list) => {
        return list.map((product) => {
            return (
                <Link to={`/product/${product.id}`} className='product-listing' key={product.id}>
                    <ProductTile imageURL={product.image1_url} key={product.id}/>
                    {console.log(product.price)}
                    <ProductInfo productName={product.name} price={product.price} />
                </Link>
            )
        })
    }


    return ( 
        <div className="products-page">
            <h2>{category=='accessories' ? `CROCHET ${category.toUpperCase()}`: `CROCHET FASHION FOR ${category.toUpperCase()}`}</h2>
            <div className={`product-list-container ${category}`}>
                {checkState(productList) ? checkState(productList): productListMapping(productList)}
            </div>
        </div>

    )
}
