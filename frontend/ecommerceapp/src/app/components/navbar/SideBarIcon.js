import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDisplay } from "./slice/sideBarSlice";
import { selectSideBarDisplay } from "./slice/sideBarSlice";

export const SideBarIcon = () => {
    const sidebarDisplay = useSelector(selectSideBarDisplay)
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (sidebarDisplay === 'flex') {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [sidebarDisplay])
    const handleClick = () => {
        dispatch(toggleDisplay());
    }
    return (
        <div className={`sidebar-icon-container ${isActive ? "active" : ""}`} onClick={handleClick}>
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