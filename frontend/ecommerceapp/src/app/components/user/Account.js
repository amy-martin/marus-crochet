import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { EditAccountButton } from "./EditAccountButton";
import { Flash } from "../miscellaneous/flash/Flash";
import { hideFlash, selectFlashConfig } from "../miscellaneous/flash/flashSlice";

export const Account = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const flash = useSelector(selectFlashConfig)
    const dispatch = useDispatch()


    // useEffect(() => {
    //     return () => {
    //         if (flash.display === 'flex') {
    //             dispatch(hideFlash)
    //         }
    //     }
    // })

    return (
        <div className="account-container">
            <h2>MY ACCOUNT</h2>
            <div className="account-info-container">
            <Flash />
            <div className="account-info">
                <div className="account-entry-container username">
                    <div className="account-entry">
                        <h4>Username:</h4>
                        <h3>{user.username}</h3>
                    </div>
                </div>
                <div className="account-entry-container email">
                    <div className="account-entry">
                        <h4>Email:</h4>
                        <h3>{user.email}</h3>
                    </div>

                </div>
                <div className="account-entry-container first-name">
                    <div className="account-entry">
                        <h4>First Name:</h4>
                        <h3>{user.first_name}</h3>
                    </div>

                </div>
                <div className="account-entry-container last-name">
                    <div className="account-entry">
                        <h4>Last Name:</h4>
                        <h3>{user.last_name}</h3>
                    </div>
                </div>
                <div className="account-entry-container phone-number">
                    <div className="account-entry">
                        <h4>Phone Number:</h4>
                        <h3>{user.phone_number}</h3>
                    </div>
                </div>
                <EditAccountButton />
            </div>

            </div>

        </div>
    )
}