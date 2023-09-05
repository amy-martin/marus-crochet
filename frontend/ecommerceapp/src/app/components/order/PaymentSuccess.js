import React, {useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCartItems, resetCart, selectCartItems, selectCartTotal } from "../cart/slice/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice";
import { Loading } from "../miscellaneous/Loading";
import { OrderListing } from "./OrderListing";
import { addOrder, getOrderDetails, selectOrderDetails, selectOrderDetailsStatus } from "./slice/orderSlice";
import { FailedToLoad } from "../miscellaneous/FailedToLoad";


export const PaymentSuccess = () => {
    const dispatch = useDispatch();
    const orderDetailsStatus = useSelector(selectOrderDetailsStatus)
    const shoppingSessionID = useSelector(selectShoppingSessionID)
    const orderDetails = useSelector(selectOrderDetails)
    const [queryParameters] = useSearchParams()
    const paymentID = queryParameters.get('session_id');
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const user = useSelector(selectUser);
    const orderAdded = localStorage.getItem('orderAdded');



    useEffect(() => {
            if (user && paymentID && shoppingSessionID) {
                dispatch(addOrder({shoppingSessionID, user, cartTotal, paymentID, cartItems}));
            }
    
    }, [shoppingSessionID, user, cartItems, orderAdded, cartTotal])



    const checkForOrderCompletion = () => {
        if (orderDetailsStatus === 'Loading') {
            return (
                <div className="order-confirmation">
                  <Loading />
                </div>)
        } else if (orderDetailsStatus === 'Failed') {
            return (
                <FailedToLoad />
            )
        }
        else if (orderDetailsStatus === 'Successful') {
            if (orderDetails)
            {
                return (
                <div className="order-confirmation">
                    <h2>Order Confirmed! Here are your order details:</h2>
                    {<OrderListing orderDetails={orderDetails} orderStatus={orderDetailsStatus}/>}

                </div>
            )}
        }
    }

    return (
        <div className='order-confirmation-container'>
            {checkForOrderCompletion()}
        </div>
    )

}
