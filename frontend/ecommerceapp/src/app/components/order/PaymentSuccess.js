import React, {useEffect} from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCartItems, fetchCartSums, resetCart, selectCartItems, selectCartTotal } from "../cart/slice/cartSlice";

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



    useEffect(() => {
        dispatch(fetchCartItems(shoppingSessionID));
        dispatch(fetchCartSums(shoppingSessionID));
        
        if (user && localStorage.getItem(`${paymentID}`)) {
            dispatch(getOrderDetails({user, paymentID}))

        }
        if (user && !localStorage.getItem(paymentID)) {



            if (shoppingSessionID && user && cartTotal && paymentID && cartItems ) {
                dispatch(addOrder({shoppingSessionID, user, cartTotal, paymentID, cartItems}));
                localStorage.setItem(`${paymentID}`, true)

            }
        }
    }, [user, paymentID, localStorage])

//     useEffect(() => {
//         // DO WHAT YOU DID IN THE BACK END IN THE FRONT. CHECK IF SOMETHING EXISTS IN THE DATABASE, 
//         // IF IT DOES, RETURN THAT, IF IT DOESNN'T, MAKE A CALL TO ADD
//         // dispatch(fetchCartSums(shoppingSessionID));
//         // dispatch(fetchCartItems(shoppingSessionID));


//         // if (user) {
//         //     dispatch(getOrderDetails({user, paymentID}))

//         //     if (!orderDetails && shoppingSessionID && user && cartTotal && paymentID && cartItems ) {
//         //         dispatch(addOrder({shoppingSessionID, user, cartTotal, paymentID, cartItems}));
//         //         dispatch(resetCart(shoppingSessionID))
//         //     }
//         // };

    
// }, [])



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
        // debugger;
    }

    return (
        <div className='order-confirmation-container'>
            {checkForOrderCompletion()}
        </div>
    )

}
