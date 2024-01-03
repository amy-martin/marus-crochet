import React, {useEffect} from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCartItems, fetchCartSums, resetCart, selectCartItems, selectCartTotal } from "../cart/slice/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice";
import { Loading } from "../miscellaneous/Loading";
import { OrderListing } from "./OrderListing";
import { addOrder, getOrderDetails, retrieveOrder, selectOrderDetails, selectOrderDetailsStatus } from "./slice/orderSlice";
import { FailedToLoad } from "../miscellaneous/FailedToLoad";


export const PaymentSuccess = () => {
    const dispatch = useDispatch();
    const orderDetailsStatus = useSelector(selectOrderDetailsStatus)
    const orderDetails = useSelector(selectOrderDetails);
    const shoppingSessionID = useSelector(selectShoppingSessionID)
    const [queryParameters] = useSearchParams()
    const orderID = queryParameters.get('session_id');
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(resetCart(shoppingSessionID));
        dispatch(retrieveOrder({user, orderID}))
        console.log('Order Details (Sent by webhooks):')
        console.log(orderDetails)

    }, [user, orderID])




    const checkForOrderCompletion = () => {

        if (orderDetailsStatus === 'Failed') {
            return (
                <FailedToLoad />
            )
        }
        else if (orderDetailsStatus === 'Successful') {
            if (orderDetails) {
                return (
                <div className="order-confirmation">
                    <h2>Order Confirmed! Here are your order details:</h2>
                    {<OrderListing orderDetails={orderDetails} orderStatus={orderDetailsStatus}/>}
                    <h3>Click <Link to='/orders'>here</Link> to view all orders</h3>
                </div>
            )}
        } else if (orderDetailsStatus === 'Loading' || orderDetailsStatus === 'Idle') {
            return (
                <div className="order-confirmation">
                  <Loading />
                </div>)
        }
    }




    return (
        <div className='order-confirmation-container'>
            {checkForOrderCompletion()}
        </div>
    )

}
