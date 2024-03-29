import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"
import { serverAddress } from "../../App";
import { Flash } from "../miscellaneous/flash/Flash";
import { useDispatch } from "react-redux";
import { displayFlash } from "../miscellaneous/flash/flashSlice";
import { timeout, toSentenceCase } from "../../helpers/miscellaneous";

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const location = useLocation();
    const flash = location.state ? location.state.flash: null;
    const flashMessage = location.state ? location.state.flashMessage: null
    const backgroundColor = location.state ? location.state.backgroundColor: null
    useEffect(() => {
        if (flash) {
            dispatch(displayFlash({
                backgroundColor, 
                flashMessage
            }))
        }
    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmationPassword) {
            dispatch(displayFlash({
                backgroundColor: 'rgba(216,80,39, 0.7)', 
                flashMessage: 'Passwords do not match. Please try again.'
            }));
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
                    phoneNumber,
                    username,
                    email,
                    password
                })
            };
            try {
                fetch(`${serverAddress}/user/register`, requestOptions)
                .then(async response => {
                    const responseObject = {
                        status: response.status,
                        info: await response.json()
                    }
                    return responseObject})
                .then(responseData => {
                    if (responseData.status === 409) {
                        dispatch(displayFlash({
                            backgroundColor: 'rgba(216,80,39, 0.7)', 
                            flashMessage: toSentenceCase(responseData.info.message)
                        }));
                    } else if (responseData.status === 200) {  
                        navigate('/login', {state: {flash: true, flashMessage: 'Successfully registered! Please log in to continue', backgroundColor: 'rgba(0, 117, 0, 0.7)'}})
                    } else return responseData.status
                })
            } catch (e) {
                throw e
            }
            
        }
    }

    return (
        <div className="registration">
            <Flash />
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
                    <div className="phone-number entry">
                        <label>Phone Number:</label>
                        <input type="text" placeholder="" name="phone-number" onChange={e => {setPhoneNumber(e.target.value)}}></input>
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
                    <h4>Already registered? <Link to='/login'>Log in here</Link></h4>
                </div>
                
            </form>
        </div>
    )
}