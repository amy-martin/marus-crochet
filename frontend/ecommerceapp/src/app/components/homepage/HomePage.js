import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { retrieveProducts } from "../../helpers/products";
import { CategoryTile } from "./CategoryTile";


export const HomePage = () => {
    const [womensImageURL, setWomensImageURL] = useState('Loading');
    const [mensImageURL, setMensImageURL] = useState('Loading');
    const [accessoriesImageURL, setAccessoriesImageURL] = useState('Loading');

    useEffect(() => {
        // Womens Icon
        retrieveProducts('women').then(womensProducts => {
            setWomensImageURL(womensProducts[0] ? womensProducts[0].image1_url : 'Failed to Load')
        })
        // Mens Icon
        retrieveProducts('men').then(mensProducts => {
            setMensImageURL(mensProducts ? mensProducts[0].image1_url : 'Failed to Load')
        })
        // Accessories Icon
        retrieveProducts('accessories').then(accessoriesProducts => {
            setAccessoriesImageURL(accessoriesProducts ? accessoriesProducts[0].image1_url : 'Failed to Load')
        })
    }, [womensImageURL, mensImageURL, accessoriesImageURL])

    return (
        <div className="home-page">
            <h2 className="category-title">OUR HANDMADE CROCHET COLLECTION</h2>
            <div className="categories">
                <CategoryTile category='women' url={womensImageURL}/>
                <CategoryTile category='men' url={mensImageURL}/>
                <CategoryTile category='accessories' url={accessoriesImageURL}/>
            </div>
            <h3 id="view-all-link"><Link to='/products'>VIEW ALL</Link></h3>
        </div>
    )
}