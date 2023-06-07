import React from "react";
import { useNavigate } from "react-router-dom";


export const BackButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(-1);
    }
    return (
        <button className='back-button' onClick={handleClick}>Back</button>
    )
}