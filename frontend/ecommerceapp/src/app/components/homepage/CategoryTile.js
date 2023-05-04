import React from "react";
import { Link } from "react-router-dom";
import { checkState } from "../../helpers/miscellaneous";
import { ProductImage } from "../products/ProductImage";

export const CategoryTile = (props) => {
    const {category, url} = props;

    return (<div className={`${category} category-container`}>
        <Link to={`/products/${category}`} className={`${category} link`}>
            {checkState(url) ? checkState(url): <ProductImage imageURL = {url}/>}
            <h2>{category.toUpperCase()}</h2>
        </Link>
    </div>)
}