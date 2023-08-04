import React, { useState }  from "react";
import { selectUser, updateUserField } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flash } from "../miscellaneous/flash/Flash";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../miscellaneous/BackButton";
import { displayFlash } from "../miscellaneous/flash/flashSlice";

export const AccountUpdateForm = () => {
    const user = useSelector(selectUser);
    const [firstName, setFirstName] = useState(`${user.first_name}`);
    const [lastName, setLastName] = useState(`${user.last_name}`);
    const [email, setEmail] = useState(`${user.email}`);
    const [phoneNumber, setPhoneNumber] = useState(`${user.phone_number}`);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const bodyToSend = {
            username: user.username,
            first_name: (firstName == user.first_name ? null: firstName),
            last_name: (lastName == user.last_name ? null: lastName),
            email: (email == user.email ? null: email),
            phone_number: (phoneNumber == user.phone_number ? null: phoneNumber)
        }
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyToSend)
        };

        fetch('http://localHost:3000/user/profile', requestOptions)
        .then(async res => {
            if (firstName !== user.first_name) dispatch(updateUserField({field: 'first_name', data: firstName}));
            if (lastName != user.last_name) dispatch(updateUserField({field: 'last_name', data: lastName}));
            if (email !== user.email) dispatch(updateUserField({field: 'email', data: email}))
            if (phoneNumber !== user.phone_number) dispatch(updateUserField({field: 'phone_number', data: phoneNumber}));

            const jsonResponse = await res.json();
            const responseObject = {
                status: res.status,
                message: jsonResponse.message
            }
            return responseObject;
        })
        .then(res => {
            if (res.status == 200) {
                navigate('/profile', {state:{flash: true, flashMessage: 'Account updated successfully', backgroundColor: 'rgba(0, 117, 0, 0.7'}, replace:true});
            } else {
                navigate('/profile/edit', {state: {flash: true, flashMessage: `${res.message}`, backgroundColor: 'rgba(216,80,39, 0.7)'},replace: true})
            }
         } )
    }
    return (
        <div className="account-container">
            <Flash/>
            <h2>MY ACCOUNT</h2>
            <form className='account-update-form' id='account-update-form' onSubmit={handleSubmit}>
                <div className="account-info">
                    <div className="account-entry-container username">
                        <div className="account-entry">
                            <h4>Username:</h4>
                            <h3>{user.username}</h3>
                        </div>
                    </div>
                    <div className="account-entry-container email">
                        <div className="account-entry">
                            <label><h4>Email</h4></label>
                            <input type="text" value={`${email}`} name='email' onChange={e => setEmail(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="account-entry-container first-name">
                        <div className="account-entry">
                            <label><h4>First Name</h4></label>
                            <input type="text" value={`${firstName}`} name='first-name' onChange={e => setFirstName(e.target.value)}></input>
                        </div>

                    </div>
                    <div className="account-entry-container last-name">
                        <div className="account-entry">
                            <label><h4>Last Name</h4></label>
                            <input type="text" value={`${lastName}`} name='last-name' onChange={e => setLastName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="account-entry-container phone-number">
                        <div className="account-entry">
                            <label><h4>Phone Number</h4></label>
                            <input type="text" value={`${phoneNumber}`} name='phone-number' onChange={e => setPhoneNumber(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='update-buttons'>
                        <BackButton />
                        <button type="submit" form='account-update-form'>Save</button>

                    </div>
                </div>

            </form>
        </div>
    )
}