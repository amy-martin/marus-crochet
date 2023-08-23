import React, { useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom"
import { selectisLoggedIn, setToLoggedIn } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flash } from "../miscellaneous/flash/Flash";
import { selectUser, setUser } from "../user/userSlice";
import { displayFlash } from "../miscellaneous/flash/flashSlice";
import { selectShoppingSessionID, setShoppingSessionID  } from "../cart/slice/shoppingSessionSlice";
import { fetchCartSums } from "../cart/slice/cartSlice";
import { serverAddress } from "../../App";

export const LogIn = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const flash = location.state ? location.state.flash: null;
    const flashMessage = location.state ? location.state.flashMessage: null
    const backgroundColor = location.state ? location.state.backgroundColor: null
    const shoppingSessionID = useSelector(selectShoppingSessionID)
    const isLoggedIn = useSelector(selectisLoggedIn)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    

    
    useEffect(() => {
        if (flash) {
            dispatch(displayFlash({
                backgroundColor, 
                flashMessage
            }))
        }
    })
    useEffect(() => {
        if (isLoggedIn && shoppingSessionID) {
            dispatch(fetchCartSums(shoppingSessionID))
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginRequestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password

            })
        };
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
            fetch(`${serverAddress}/user/login`, loginRequestOptions)
                .then(async res => {
                    if (res.ok) {
                        const response = await res.json();

                        localStorage.setItem('user', JSON.stringify(response.user))

                        const user = localStorage.getItem('user')
                        ? JSON.parse(localStorage.getItem('user'))
                        : null;
                        dispatch(setUser(user));
                        dispatch(setToLoggedIn());

                        await fetch(`${serverAddress}/shoppingSession`, shoppingSessionRequestOptions);

                        await fetch(`${serverAddress}/shoppingSession`, shoppingSessionIDRequestOptions)
                        .then(res => {
                            return res.json()
                        })
                        .then(resJSON => {
                            dispatch(setShoppingSessionID(resJSON.id));
                            return navigate('/profile', {state:{flash: true, flashMessage: response.message, backgroundColor: 'rgba(0, 117, 0, 0.7)'}, replace: true})    
                        })

                        
                        } else {
                        const errorResponse = await res.json();
                        if (errorResponse && errorResponse.message) {
                            dispatch(displayFlash({
                                backgroundColor: 'rgba(216,80,39, 0.7)',
                                flashMessage: errorResponse.message
                            }))
                        } else {
                            console.log(errorResponse)
                        }
                    }
                })
        } catch (e) {
            console.log(e)
        }
            

    }
    return (
        <div className='login flash-message-container'>
            <Flash />
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-container">
                    <div className="login-inputs login-item">
                        <div className="login-input">
                            <div className='label-container'><label>Username: </label></div>
                            <input type="text" placeholder="Enter username" name="username" onChange={e => setUsername(e.target.value)}></input>
                        </div>
                        <div className="login-input">
                            <div className='label-container'><label>Password: </label></div>
                            
                            <input type="password" placeholder="Enter password" name="password" onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </div>

                    <div className="login-item">
                        <button type="submit">Log In</button>
                    </div>
                    <div className="login-item">
                        <h4>Not registered? <Link to='/register'>Register here</Link></h4>
                    </div>
                </div>
            </form>
        </div>
    );
}
