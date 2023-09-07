import React, {useEffect} from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCartItems, fetchCartSums, resetCart, selectCartItems, selectCartTotal } from "../cart/slice/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice";
import { Loading } from "../miscellaneous/Loading";
import { OrderListing } from "./OrderListing";
import { addOrder, getOrderDetails, selectOrderDetails, selectOrderDetailsStatus, selectOrderQueryType } from "./slice/orderSlice";
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
    const orderQueryType = useSelector(selectOrderQueryType)



    useEffect(() => {
        dispatch(fetchCartSums(shoppingSessionID));
        dispatch(fetchCartItems(shoppingSessionID))

        if (user && shoppingSessionID && paymentID) {

            dispatch(addOrder({shoppingSessionID, user, cartTotal, paymentID, cartItems}));
            if (orderQueryType === 'POST') {
                dispatch(resetCart(shoppingSessionID))
            }
        }
    
        
    }, [shoppingSessionID, user, paymentID])



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
            if (orderDetails) {
                return (
                <div className="order-confirmation">
                    <h2>Order Confirmed! Here are your order details:</h2>
                    {<OrderListing orderDetails={orderDetails} orderStatus={orderDetailsStatus}/>}
                    <h3>Click <Link to='/orders'>here</Link> to view all orders</h3>
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
