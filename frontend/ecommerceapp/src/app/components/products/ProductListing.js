import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { checkState } from "../../helpers/miscellaneous";
import { retrieveProducts } from "../../helpers/products";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";

export const ProductListing = () => {
    const {category} = useParams();
    const [productList, setProductList] = useState('Loading');

    useEffect(() => {
        if (category) {
            retrieveProducts(category).then(products => {
                console.log(productList)
                setProductList(Array.isArray(products) ? products : 'Failed to Load')
            }) 
        } else {
            retrieveProducts().then(products => {
                console.log(productList)
                setProductList(Array.isArray(products) ? products : 'Failed to Load')
            })
        }
    }, [category]);

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

    const productPageTitle = (category) => {
        if (!category) return 'OUR FULL COLLECTION'
        else if (category == 'accessories') return 'ACCESSORIES'
        else return `OUR ${category.toUpperCase()}'S COLLECTION`
    }


    return ( 
        <div className="products-page">
            <h2>{productPageTitle(category)}</h2>
            <div className={`product-list-container ${category ? category:''}`}>
                {checkState(productList) ? checkState(productList): productListMapping(productList)}
            </div>
        </div>

    )
}
