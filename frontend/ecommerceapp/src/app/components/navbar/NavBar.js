import React from "react";
import {Link} from "react-router-dom"

export const NavBar = () => {
    return (
        <nav>
            <div className = "nav-components">
                <div className="generic nav-component">
                    <ul>
                            <li>
                                <h3><a>PRODUCTS</a></h3>
                            </li>
                            <li>
                                <h3><a>NEW</a></h3>
                            </li>
                            <li>
                                <h3><a>BRAND</a></h3>
                            </li>
                            <li>
                                <h1><a>MARU</a></h1>
                            </li>
                            <li>
                                <h3><a>CUSTOMER SERVICE</a></h3>
                            </li>
                            <li> 
                                <h3><a>SEARCH</a></h3>
                            </li>
                        </ul>
                </div>
                <div className="user nav-component">
                    <ul>
                        <li> 
                            <h4><Link to="/login">LOG IN/SIGN UP</ Link></h4>
                        </li>
                        <li> 
                            <h4><Link>CART</Link></h4>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}