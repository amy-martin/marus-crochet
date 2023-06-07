import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { toggleDisplay } from "./slice/sideBarSlice";

export const SideBarIcon = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleDisplay());
    }
    return (
        <div className="sidebar-icon-container" onClick={handleClick}>
            <ul className="sidebar-icon">
                <li>
                    <hr/>
                </li>
                <li>
                    <hr/>
                </li>
                <li>
                    <hr/>
                </li>
            </ul>
        </div>

    )
}