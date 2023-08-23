import React from "react";
import { useNavigate } from "react-router-dom";
import { serverAddress } from "../App";
import { setToLoggedIn } from "../components/login/loginSlice";
import { setUser } from "../components/user/userSlice";
import { setShoppingSessionID } from "../components/cart/slice/shoppingSessionSlice";


export const login = async (dispatch) => {
    
    const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

    if (user) {
        setUser(user);
        const shoppingSessionRequestOptions = {
            method:'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            }
        }
        const shoppingSessionIDRequestOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            }
        }
        try {
            dispatch(setUser(user));
            dispatch(setToLoggedIn());
            await fetch(`${serverAddress}/shoppingSession`, shoppingSessionRequestOptions);
            await fetch(`${serverAddress}/shoppingSession`, shoppingSessionIDRequestOptions)
                .then(res => {
                    return res.json()
                    })
                .then(resJSON => {
                    dispatch(setShoppingSessionID(resJSON.id));
                    })
                    }
        catch (e) {
            console.log(e)
        }

        } else {
            throw new Error('User not set in Local Storage')
        }
    }