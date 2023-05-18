import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { toggleDisplay } from "./slice/sideBarSlice";

export const SideBarIcon = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleDisplay());
    }
    return (
        <div className="sidebar-icon" onClick={handleClick}>
            <hr/>
            <hr/>
            <hr/>
        </div>
    )
}