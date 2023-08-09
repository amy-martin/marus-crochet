import React from "react";
import { RegularScreenNavBar } from "./RegularScreenNavbar";
import { SmallScreenNavBar } from "./SmallScreenNavBar";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryDropdownDisplay, displayDropdown, hideDropdown } from "./slice/categorySlice";


export const NavBar = () => {
    const display = useSelector(selectCategoryDropdownDisplay)
    const dispatch = useDispatch();

    const handleCategoryClick = () => {
        dispatch(displayDropdown());
    }
    const hideCategoryDropdown = () => {
        dispatch(hideDropdown())
    }
    
    return (
        <header >
            <RegularScreenNavBar handleCategoryClick={handleCategoryClick} hideCategoryDropdown={hideCategoryDropdown}/>
            <SmallScreenNavBar handleCategoryClick={handleCategoryClick} />
         </header>
    )
}