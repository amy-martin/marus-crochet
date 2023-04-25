import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmationPassword) {
            throw new Error('Passwords Do Not Match')
        } else {
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    telephone,
                    username,
                    email,
                    password
                })
            };
            try {
                fetch('http://localHost:3000/user/register', requestOptions)
                .then(async response => {
                    const responseObject = {
                        status: response.status,
                        info: await response.json()
                    }
                    return responseObject})
                .then(responseData => {
                    if (responseData.status === 409) {
                        alert(responseData.info.message)
                        navigate('/register')
                    } else if (responseData.status === 200) {  
                        navigate('/login')
                    } else return responseData.status
                })
            } catch (e) {
                throw new e
            }
            
        }
    }

    return (
        <div className="registration">
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="registration-container">
                    <div className="first-name entry">
                        <label>First Name:</label>
                        <input type="text" placeholder="" name="first-name" onChange={e => setFirstName(e.target.value)}></input>
                    </div>
                    <div className="last-name entry">
                        <label>Last Name: </label>
                        <input type="text" placeholder="" name="last-name" onChange={e => setLastName(e.target.value)}></input>
                    </div>
                    <div className="telephone entry">
                        <label>Phone Number:</label>
                        <input type="text" placeholder="" name="telephone" onChange={e => {setTelephone(e.target.value)}}></input>
                    </div>
                    <div className="username entry">
                        <label>Username:</label>
                        <input type="text" placeholder="" name="username" onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <div className="email entry">
                        <label>Email:</label>
                        <input type="text" placeholder="" name="email" onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className="password entry">
                        <label>Password:</label>
                        <input type="password" placeholder="" name="password" onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div className="confirmation-password entry">
                        <label>Confirm Password:</label>
                        <input type="password" placeholder="" name="confirmation-password" onChange={e => setConfirmationPassword(e.target.value)}></input>
                    </div>
                    <button>Submit</button>
                </div>
                
            </form>
        </div>
    )
}