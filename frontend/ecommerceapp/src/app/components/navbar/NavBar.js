import React from "react";
import {Link} from "react-router-dom"
import { RegularScreenNavBar } from "./RegularScreenNavbar";
import { SmallScreenNavBar } from "./SmallScreenNavBar";

export const NavBar = () => {
    return (
        <nav>
            <RegularScreenNavBar />
            <SmallScreenNavBar />
        </nav>

    )
}