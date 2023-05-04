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
