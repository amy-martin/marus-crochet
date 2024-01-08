import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectisLoggedIn } from "../login/loginSlice";
import { LogOut } from '../login/LogOut'
import { fetchCartSums, selectCartQuantity } from "../cart/slice/cartSlice";
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice";

export const UserSpecificNavOptions = () => {
    const isLoggedIn = useSelector(selectisLoggedIn);
    const cartQuantity = useSelector(selectCartQuantity)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shoppingSessionID = useSelector(selectShoppingSessionID)

    useEffect(() => {
        if (shoppingSessionID) {
            dispatch(fetchCartSums(shoppingSessionID))

        }
    }, [dispatch])
    
    const handleLoggedOutClick = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login', {state:{flash: true, flashMessage: 'Please log in before continuing', backgroundColor: 'rgba(216,80,39, 0.7)'}, replace: true});
        }
    }
    
    const loggedInDisplay = (
        <ul className="user-specific-options">
            <li>
               <NavLink to='/profile'><h4>ACCOUNT </h4></NavLink>
            </li>
            <li>
                <NavLink to ='/orders'><h4>ORDERS</h4></NavLink>
            </li>
            <li>
                <NavLink to = '/cart'><h4> CART ({cartQuantity}) </h4></NavLink>
            </li>
            <li>
                <LogOut />
            </li>

        </ul>
    )

    const loggedOutDisplay = (
        <ul className="user-specific-options">
            <li>
                <NavLink to="/login"><h4>LOG IN /<br/> SIGN UP</h4></NavLink>
            </li>
            <li>
                <a onClick={handleLoggedOutClick}><h4> CART</h4></a>
            </li>
        </ul>
    )
    
    return (
        <div className="user nav-component">
           {isLoggedIn ? loggedInDisplay: loggedOutDisplay} 
        </div>
        
    )
}