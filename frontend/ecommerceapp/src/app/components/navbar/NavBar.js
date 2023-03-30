import React from "react";

export const NavBar = () => {
    return (
        <nav>
            <div className="nav generic">
                <ul className="nav-components">
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
            <div className="nav user">
                <ul>
                    <li> 
                        <h3><a>LOG IN/SIGN UP</a></h3>
                    </li>
                    <li> 
                        <h3><a>CART</a></h3>
                    </li>
                </ul>
            </div>
        </nav>
    )
}