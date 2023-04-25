import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"

export const LogIn = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        };
        fetch('http://localHost:3000/user/login', requestOptions)
            .then(async res => await res.json())
            .then(navigate('/'))
    }
    return (
        <div className='login'>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-container">
                    <label>Username: </label>
                    <input type="text" placeholder="Enter username" name="username" onChange={e => setUsername(e.target.value)}></input>
                    <label>Password: </label>
                    <input type="password" placeholder="Enter password" name="password" onChange={e => setPassword(e.target.value)}></input>
                    <button type="submit">Log In</button>
                    <h3>Not registered? <Link to='/register'>Register here</Link></h3>
                </div>
            </form>
        </div>
    );
}
