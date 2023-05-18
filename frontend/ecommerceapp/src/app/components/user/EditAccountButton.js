import React from "react";
import { useNavigate } from "react-router-dom";

export const EditAccountButton = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/profile/edit')
    }

    return (
        <button onClick={handleClick}>Edit</button>
    )
}