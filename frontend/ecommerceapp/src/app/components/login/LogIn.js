import React, { useState } from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom"
import { selectisLoggedIn, setToLoggedIn } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flash } from "../miscellaneous/flash/Flash";
import { setUser, selectUser } from "../user/userSlice";

export const LogIn = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const flash = location.state ? location.state.flash: null;
    const flashMessage = location.state ? location.state.flashMessage: null
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    console.log(flashMessage)
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                username,
                password
            })
        };
        try {
            fetch('http://localHost:3000/user/login', requestOptions)
                .then(async res => await res.json())
                .then(res => {
                    if (res.info && res.info.err) {
                        // ADD FLASH MESSAGE
                        navigate('/login', {state: {flash: true, flashMessage: res.info.message }} )
                    } else {
                        dispatch(setUser(res))
                        dispatch(setToLoggedIn())
                        navigate('/profile', {state: {flash: true, backgroundColor: 'rgba(0, 117, 0, 0.7)', flashMessage: 'Successfully logged in', flashTimeout: 7000}, replace: true});
                    }
                })
        } catch (e) {
            throw e
        }

    }
    return (
        <div className='login flash-message-container'>
            {flash ? <Flash flash = {flash} flashMessage={flashMessage} backgroundColor ='rgba(216,80,39, .7)'/>: <Flash flash = {false} />}

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
