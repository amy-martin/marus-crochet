import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideFlash, selectFlashConfig } from './flashSlice';

export const Flash = () => {
    const flashConfig = useSelector(selectFlashConfig);
    const dispatch = useDispatch()
    let { className, display, flashMessage, backgroundColor } = flashConfig;

    useEffect(() => {
        if (display) {
            let timeout = setTimeout(() => {
                dispatch(hideFlash())
            }, 5000);
            return () => {
                clearTimeout(timeout)
                dispatch(hideFlash())
            }
        }
    }, [])
    return (
        <div className={`flash-message ${className ? className: null}`} style={{display, backgroundColor}}>
            <h4>{flashMessage}</h4>
        </div>
    )

}