import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./userSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { EditAccountButton } from "./EditAccountButton";
import { Flash } from "../miscellaneous/flash/Flash";

export const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const flash = location.state ? location.state.flash: null;
    const backgroundColor = location.state ? location.state.backgroundColor: null
    const flashMessage = location.state ? location.state.flashMessage: null
    const user = useSelector(selectUser);
    return (
        <div className="account-container">
            <h2>MY ACCOUNT</h2>
            {flash ? <Flash flash={flash} backgroundColor={backgroundColor} flashMessage={flashMessage}/>: <Flash flash={false} />}
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
                <div className="account-entry-container telephone">
                    <div className="account-entry">
                        <h4>Phone Number:</h4>
                        <h3>{user.telephone}</h3>
                    </div>
                </div>
            </div>
            <EditAccountButton />
        </div>
    )
}