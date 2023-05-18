import React from "react";
import { selectCategoryDropdownDisplay } from "./slice/categorySlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export const CategoryDropDown = () => {
    const display = useSelector(selectCategoryDropdownDisplay)
    return (
        <div className='category-dropdown' style={{display:`${display}`}} >
            <ul>
                <li>
                    <Link to='/products/women'>
                      WOMENS  
                    </Link>
                </li>
                <li>
                    <Link to='/products/men'>
                      MENS  
                    </Link>
                </li>
                <li>
                    <Link to='/products/accessories'>
                      ACCESSORIES  
                    </Link>
                </li>
                <li>
                    <Link to='/products'>
                      ALL  
                    </Link>
                </li>
                
            </ul>
        </div>
        )
}