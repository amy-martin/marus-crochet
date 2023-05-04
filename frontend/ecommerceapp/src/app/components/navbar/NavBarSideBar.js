import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplay } from "./slice/sideBarSlice";
import { Link } from "react-router-dom";
import { selectQuantity } from "../cart/slice/cartSlice";
import { changeDisplayByValue } from "./slice/sideBarSlice";


export const NavBarSideBar = () => {
    const dispatch = useDispatch()
    const display = useSelector(selectDisplay)
    const quantity = useSelector(selectQuantity);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    

    // UseEffect to Set Event Listener
    useEffect(() => {
        const handleWidthResize = () => {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleWidthResize)
    })

    // UseEffect to Stop Display Past Certain Width

    useEffect(() => {
        if (screenWidth >= 690) {
            dispatch(changeDisplayByValue('none'))
        }
    })
    return (
        <div className="sidebar" id='sidebar' style={{display:`${display}`}}>
            <div className="sidebar-content">
                <h3 className="nav-component"><Link to='/products'>PRODUCTS</Link></h3>
                <h3 className="nav-component"><Link>NEW</Link></h3>
                <h3 className="nav-component"><Link>BRAND</Link></h3>
                <h3 className="nav-component"><Link>CUSTOMER SERVICE</Link></h3>
                <h3 className="nav-component"><Link>SEARCH</Link></h3>
                <ul className="user nav-component">
                            <li> 
                                <h4><Link to="/login">LOG IN/SIGN UP</ Link></h4>
                            </li>
                            <li> 
                                <h4><Link>CART ({quantity})</Link></h4>
                            </li>
                </ul>
            </div>
        </div>
    )
}