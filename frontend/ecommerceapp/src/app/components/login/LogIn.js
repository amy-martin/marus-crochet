import React from "react";
import {Link} from "react-router-dom"

export const LogIn = () => {
    return (
        <div className='login'>
            <form className="login-form">
                <div className="login-container">
                    <label>Username or Email:</label>
                    <input type="text" placeholder="Enter username or email" name="username"></input>
                    <label>Password:</label>
                    <input type="text" placeholder="Enter password" name="password"></input>
                    <button type="submit">Log In</button>
                    <h3>Not registered? <Link to='/register'>Register here</Link></h3>
                </div>
            </form>
        </div>
    );
}
