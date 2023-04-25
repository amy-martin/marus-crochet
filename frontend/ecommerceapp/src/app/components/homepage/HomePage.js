import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"  
import { ProductTile } from "../products/ProductTile";
import { checkState } from "../../helpers/miscellaneous";
import { retrieveProduct, retrieveProducts } from "../../helpers/products";


export const HomePage = () => {
    const [womensImageURL, setWomensImageURL] = useState('Loading');
    const [mensImageURL, setMensImageURL] = useState('Loading');
    const [accessoriesImageURL, setAccessoriesImageURL] = useState('Loading');

    useEffect(() => {
        // Womens Icon
        retrieveProduct(14).then(womensProduct => {
            setWomensImageURL(womensProduct ? womensProduct.image1_url: 'Failed to Load')
        })
        // Mens Icon
        retrieveProduct(5).then(mensProduct => {
            setMensImageURL(mensProduct ? mensProduct.image1_url: 'Failed to Load')
        })
        // Accessories Icon
        retrieveProduct(23).then(accessoriesProduct => {
            setAccessoriesImageURL(accessoriesProduct ? accessoriesProduct.image1_url: 'Failed to Load')
        })
    }, [womensImageURL, mensImageURL, accessoriesImageURL])

    return (
        <div className="home-page">
            <div className="women's category-container">
                <Link to='/products/womens' className="womens link">
                    {checkState(womensImageURL) ? checkState(womensImageURL): <ProductTile imageURL = {womensImageURL}/>}
                    <h4>WOMEN'S</h4>
                </Link>
            </div>
            <div className="men's category-container ">
                <Link to='/products/mens' className="mens link">
                    {checkState(mensImageURL) ? checkState(mensImageURL): <ProductTile imageURL = {mensImageURL}/>}
                    <h4>MEN'S</h4>
                </Link>
            </div>
            <div className="accessories category-container">
                <Link to='/products/accessories' className="accessories link">
                    {checkState(accessoriesImageURL) ? checkState(accessoriesImageURL): <ProductTile imageURL = {accessoriesImageURL}/>}
                    <h4>ACCESSORIES</h4>
                </Link>
            </div>
        </div>
    )
}