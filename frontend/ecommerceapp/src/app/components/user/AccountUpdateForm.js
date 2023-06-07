import React, { useState }  from "react";
import { selectUser, updateUserField } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flash } from "../miscellaneous/flash/Flash";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BackButton } from "../miscellaneous/BackButton";
import { selectisLoggedIn } from "../login/loginSlice";

export const AccountUpdateForm = () => {
    const user = useSelector(selectUser);
    const location = useLocation();
    const flash = location.state ? location.state.flash: null
    const backgroundColor = location.state ? location.state.backgroundColor: null
    const flashMessage = location.state ? location.state.flashMessage: null
    const isLoggedIn = useSelector(selectisLoggedIn)


    const [firstName, setFirstName] = useState(`${user.first_name}`);
    const [lastName, setLastName] = useState(`${user.last_name}`);
    const [email, setEmail] = useState(`${user.email}`);
    const [telephone, setTelephone] = useState(`${user.telephone}`);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const bodyToSend = {
            username: user.username,
            first_name: (firstName == user.first_name ? null: firstName),
            last_name: (lastName == user.last_name ? null: lastName),
            email: (email == user.email ? null: email),
            telephone: (telephone == user.telephone ? null: telephone)
        }
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(bodyToSend)
        };

        fetch('http://localHost:3000/user/profile', requestOptions)
        .then(async res => {
            const jsonResponse = await res.json();
            console.log(jsonResponse)
            const responseObject = {
                status: res.status,
                message: jsonResponse.message
            }
            return responseObject;
        })
        .then(res => {
            console.log(user)
            if (firstName !== user.first_name) dispatch(updateUserField({field: 'first_name', data: firstName}));
            if (lastName != user.last_name) dispatch(updateUserField({field: 'last_name', data: lastName}));
            if (email !== user.email) dispatch(updateUserField({field: 'email', data: email}))
            if (telephone !== user.telephone) dispatch(updateUserField({field: 'telephone', data: telephone}))
    
            return res
        })
        .then(res => {
            if (res.status == 200) {
                navigate('/profile', {state: {flash: true, backgroundColor: 'rgba(0, 117, 0, 0.7)', flashMessage: 'Account updated successfully', flashTimeout: 7000}, replace: true});
            } else {
                navigate('/profile/edit', {state: {flash: true, backgroundColor: 'rgba(216,80,39, 0.7)', flashMessage: `${res.message}`}, replace: true});
            }
         } )
    }
    return (
        <div className="account-container">
            {flash ? <Flash flash={flash} backgroundColor={backgroundColor} flashMessage={flashMessage}/>: <Flash flash={false} />}
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
                    <div className="account-entry-container telephone">
                        <div className="account-entry">
                            <label><h4>Phone Number</h4></label>
                            <input type="text" value={`${telephone}`} name='telephone' onChange={e => setTelephone(e.target.value)}></input>
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