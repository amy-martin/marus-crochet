import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const Flash = (props) => {

    const { className, flash, flashMessage, backgroundColor } = props;
    let display
    if (flash) {
        display = 'flex';
    } else display = 'none'


    return (
        <div className={`flash-message ${className ? className: null}`} style={{display, backgroundColor}}>
            <h4>{flashMessage}</h4>
        </div>
    )

}