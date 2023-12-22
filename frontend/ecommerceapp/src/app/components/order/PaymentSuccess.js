import React, {useEffect} from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCartItems, fetchCartSums, resetCart, selectCartItems, selectCartTotal } from "../cart/slice/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice";
import { Loading } from "../miscellaneous/Loading";
import { OrderListing } from "./OrderListing";
import { addOrder, getOrderDetails, retreiveOrder, selectOrderDetails, selectOrderDetailsStatus } from "./slice/orderSlice";
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
        dispatch(retreiveOrder({user, orderID}))
        console.log('Order Details (Sent by webhooks):')
        console.log(orderDetails)

    }, [user, orderID])


    // useEffect(() => {
        
    //     if (user && localStorage.getItem(`${paymentID}`)) {
    //         dispatch(getOrderDetails({user, paymentID}))

    //     }
    //     if (user && !localStorage.getItem(paymentID)) {



    //         if (shoppingSessionID && user && cartTotal && paymentID && cartItems ) {
    //             dispatch(addOrder({shoppingSessionID, user, cartTotal, paymentID, cartItems}));
    //             localStorage.setItem(`${paymentID}`, true)

    //         }
    //     }
    // }, [user, paymentID, localStorage])

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
    }




    return (
        <div className='order-confirmation-container'>
            {checkForOrderCompletion()}
        </div>
    )

}
