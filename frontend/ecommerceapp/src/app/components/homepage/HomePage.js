import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { retrieveProducts } from "../../helpers/products";
import { CategoryTile } from "./CategoryTile";


export const HomePage = () => {
    const [homeImageURL, setHomeImageURL] = useState('Loading');
    const [plushiesImageURL, setPlushiesImageURL] = useState('Loading');
    const [accessoriesImageURL, setAccessoriesImageURL] = useState('Loading');

    useEffect(() => {
        // Home Icon
        retrieveProducts('home').then(homeProducts => {
            setHomeImageURL(homeProducts[0] ? homeProducts[0].image1_url : 'Failed to Load')
        })
        // Toys Icon
        retrieveProducts('plushies').then(plushiesProducts => {
            setPlushiesImageURL(plushiesProducts ? plushiesProducts[0].image1_url : 'Failed to Load')
        })
        // Accessories Icon
        retrieveProducts('accessories').then(accessoriesProducts => {
            setAccessoriesImageURL(accessoriesProducts ? accessoriesProducts[0].image1_url : 'Failed to Load')
        })
    }, [homeImageURL, plushiesImageURL, accessoriesImageURL])

    return (
        <div className="home-page">
            <div className="categories">
                <CategoryTile category='home decor' url={homeImageURL}/>
                <CategoryTile category='plushies' url={plushiesImageURL}/>
                <CategoryTile category='accessories' url={accessoriesImageURL}/>
            </div>
            <h3 id="view-all-link"><Link to='/products'>VIEW ALL</Link></h3>
            <div className="disclaimer">
                <h3>DISCLAIMER:</h3>
                <p id='home-page-bottom'>This site is created purely for demonstration purposes to showcase my development skills. It is not a real business or e-commerce website. Any products, services, or features displayed on this site are fictional and not intended for real-world use.</p>
          </div>
        </div>
    )
}