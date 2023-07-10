import React, { useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom"
import { setToLoggedIn } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flash } from "../miscellaneous/flash/Flash";
import { setUser } from "../user/userSlice";
import { displayFlash, hideFlash, selectFlashConfig } from "../miscellaneous/flash/flashSlice";

export const LogIn = (props) => {
    const navigate = useNavigate();
    const flash = useSelector(selectFlashConfig)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    // useEffect(() => {
    //     return () => {
    //         console.log('I have unmounted')
    //         dispatch(hideFlash);
    //     }
    // }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const loginRequestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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
                Authorization: `Bearer ${token}`
            }
        }
        try {
            fetch('http://localHost:3000/user/login', loginRequestOptions)
                .then(async res => {
                    console.log(res)
                    if (res.ok) {
                        const response = await res.json();
                        dispatch(setUser(response.user));
                        dispatch(setToLoggedIn())
                        navigate('/profile', {replace: true})
                        dispatch(displayFlash({
                            backgroundColor: 'rgba(0, 117, 0, 0.7)', 
                            flashMessage: response.message
                        }));
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
                .catch(error => {
                    console.error(error);
                });
            fetch('http://localHost:3000/shoppingSession', shoppingSessionRequestOptions)
            .then(res => console.log(res))
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
