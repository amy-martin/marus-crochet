import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { CategoryDropDown } from "./CategoryDropDown";
import { UserSpecificNavOptions } from "./UserSpecificNavOptions";

export const RegularScreenNavBar = (props) => {
    const {handleCategoryClick, hideCategoryDropdown} = props


    return (
        <div className="regular-screen" onMouseLeave={hideCategoryDropdown}>
            <nav className="regular-screen-nav-bar">
                <div className = "regular-screen nav-components">
                    <ul className='left generic-nav-component' >
                        <li onMouseOver={handleCategoryClick}>
                            <h3>
                                <a>
                                    
                                    PRODUCTS
                                                            
                                </a>
                            </h3>
                            
                        </li>
                        <li>
                            <h3><Link to = '/products/new'>NEW</Link></h3>
                        </li>
                    </ul>
                    <ul className="middle generic-nav-component">
                        <li>
                            <h1 id="site-title"><Link to='/'>MARU</Link></h1>
                        </li>
                    </ul>
                    
                    <ul className='right generic-nav-component'>
                        <li>
                            <h3><Link to='/contact-us'>CUSTOMER SERVICE</Link></h3>
                        </li>
                        <li>
                            <h3><Link to='/about-us'>ABOUT US</Link></h3>
                        </li>
                    </ul>
                    <UserSpecificNavOptions />
                    
                </div>
            </nav>
            <CategoryDropDown />
        </div>
    )
}