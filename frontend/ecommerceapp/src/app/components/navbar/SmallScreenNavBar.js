import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SideBarIcon } from "./SideBarIcon";

export const SmallScreenNavBar = () => {
    return (
        <nav className="small-screen navbar">
            <div className="small-screen nav-components">
                <SideBarIcon/>
                <div className= "generic-nav-component">
                    <h1 id="site-title"><Link to='/'>MARU</Link></h1>
                </div>
            </div>            
        </nav>

    )
}