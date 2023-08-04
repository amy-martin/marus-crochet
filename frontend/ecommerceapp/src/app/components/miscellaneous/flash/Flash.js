import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideFlash, selectFlashConfig } from './flashSlice';
import { timeout } from '../../../helpers/miscellaneous';

export const Flash = () => {
    const flashConfig = useSelector(selectFlashConfig);
    const dispatch = useDispatch()
    let { className, display, flashMessage, backgroundColor } = flashConfig;


    useEffect(() => {
        timeout(flashConfig.display, dispatch);
        if (display === 'flex') {
            return (() => {
                dispatch(hideFlash())
        })}
    }, [display])

    // Create a hide flash helper function for timeout instead
    return (
        <div className={`flash-message ${className ? className: null}`} style={{display, backgroundColor}}>
            <h4>{flashMessage}</h4>
        </div>
    )

}