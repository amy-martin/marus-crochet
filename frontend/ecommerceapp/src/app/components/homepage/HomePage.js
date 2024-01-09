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
            <div className="categories">
                <CategoryTile category='women' url={womensImageURL}/>
                <CategoryTile category='men' url={mensImageURL}/>
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