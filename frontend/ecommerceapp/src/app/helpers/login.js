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

        const shoppingSessionID = localStorage.getItem('shoppingSessionID')
        ? JSON.parse(localStorage.getItem('shoppingSessionID'))
        : null;        

    if (user && shoppingSessionID) {
        try {
            dispatch(setUser(user));
            dispatch(setToLoggedIn());
            dispatch(setShoppingSessionID(shoppingSessionID))
            }
        catch (e) {
            console.log(e)
        }

        } else {
            throw new Error('User not set in Local Storage')
        }
    }