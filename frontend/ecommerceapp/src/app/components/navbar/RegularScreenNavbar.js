import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectQuantity } from "../cart/slice/cartSlice"


export const RegularScreenNavBar = () => {
    const quantity = useSelector(selectQuantity)
    return (
            <div className = "regular-screen nav-components">
                <ul className='left generic-nav-component' >
                    <li>
                        <h3><Link to='/products'>PRODUCTS</Link></h3>
                    </li>
                    <li>
                        <h3><Link>NEW</Link></h3>
                    </li>
                    <li>
                        <h3><Link>ABOUT US</Link></h3>
                    </li>
                </ul>
                <ul className="middle generic-nav-component">
                    <li>
                        <h1 id="site-title"><Link to='/'>MARU</Link></h1>
                    </li>
                </ul>
                
                <ul className='right generic-nav-component'>
                    <li>
                        <h3><Link>CUSTOMER SERVICE</Link></h3>
                    </li>
                    <li> 
                        <h3><Link>SEARCH</Link></h3>
                    </li>
                </ul>
                <ul className="user-nav-component">
                        <li> 
                            <h4><Link to="/login">LOG IN/SIGN UP</ Link></h4>
                        </li>
                        <li> 
                            <h4><Link>CART ({quantity})</Link></h4>
                        </li>
                </ul>
            </div>
    )
}