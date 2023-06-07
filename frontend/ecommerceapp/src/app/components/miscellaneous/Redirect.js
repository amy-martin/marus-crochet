import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login')
        }, 10000)
    })
    return (
        <div className="redirect-container">
            <h4>Oops! Looks like you don't have access to this page. Please log in before continuing...</h4>
            <h4>If you are not redirected, please click <Link to='/login'>here</Link></h4>
        </div>
    )
}