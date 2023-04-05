import React from "react";
import {Link} from "react-router-dom"

export const NavBar = () => {
    return (
        <nav>
            <div className = "nav-components">
                <ul className='left generic-nav-component' >
                    <li>
                        <h3><a>PRODUCTS</a></h3>
                    </li>
                    <li>
                        <h3><a>NEW</a></h3>
                    </li>
                    <li>
                        <h3><a>BRAND</a></h3>
                    </li>
                </ul>
                <ul className="middle generic-nav-component">
                    <li>
                        <h1 className="site-name"><a>MARU</a></h1>
                    </li>
                </ul>
                
                <ul className='right generic-nav-component'>
                    <li>
                        <h3><a>CUSTOMER SERVICE</a></h3>
                    </li>
                    <li> 
                        <h3><a>SEARCH</a></h3>
                    </li>
                </ul>
                <ul className="user-nav-component">
                        <li> 
                            <h4><Link to="/login">LOG IN/SIGN UP</ Link></h4>
                        </li>
                        <li> 
                            <h4><Link>CART</Link></h4>
                        </li>
                </ul>
            </div>
        </nav>
    )
}