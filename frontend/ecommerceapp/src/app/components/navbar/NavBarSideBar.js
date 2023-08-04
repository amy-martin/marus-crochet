import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSideBarDisplay, toggleDisplay, turnOffDisplay } from "./slice/sideBarSlice";
import { Link } from "react-router-dom";
import { changeDisplayByValue } from "./slice/sideBarSlice";
import { CategoryDropDown } from "./CategoryDropDown";
import { displayDropdown, hideDropdown, toggleDropdown } from "./slice/categorySlice";
import { selectisLoggedIn } from "../login/loginSlice";
import { UserSpecificNavOptions } from "./UserSpecificNavOptions";


export const NavBarSideBar = () => {
    const dispatch = useDispatch()
    const display = useSelector(selectSideBarDisplay)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const isLoggedIn = useSelector(selectisLoggedIn)
    const handleSidebarExit = () => {
        dispatch(turnOffDisplay())
    }
    const handleClick = () => {
        dispatch(toggleDropdown())
    }
    const hideCategoryDropdown = () => {
        dispatch(hideDropdown())
    }

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
            <div className="sidebar-content"  onMouseLeave = {handleSidebarExit}>
                <h3 className="nav-component" onClick = {handleClick} onMouseLeave={hideCategoryDropdown}>
                    <a>PRODUCTS</a>
                    <CategoryDropDown />
                </h3>
                <h3 className="nav-component"><Link to = '/products/new'>NEW</Link></h3>
                <h3 className="nav-component"><Link to='/about-us'>ABOUT US</Link></h3>
                <h3 className="nav-component"><Link to='/contact-us'>CUSTOMER SERVICE</Link></h3>
                <UserSpecificNavOptions />
            </div>
        </div>
    )
}