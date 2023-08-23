import React, {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCartSums, selectCartItems, selectCartQuantity, selectCartTotal } from "../cart/slice/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { serverAddress } from "../../App";
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice";
import { Loading } from "../miscellaneous/Loading";
import { OrderTile } from "../order/OrderTile";


export const PaymentSuccess = () => {
    const cartQuantity = useSelector(selectCartQuantity)
    const shoppingSessionID = useSelector(selectShoppingSessionID)
    const dispatch = useDispatch();
    const [queryParameters] = useSearchParams()
    const paymentID = queryParameters.get('session_id');
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const user = useSelector(selectUser);
    const [orderDetails, setOrderDetails] = useState(null)

    useEffect(() => {
        if (user) {


        const addOrder = async () => {
            console.log(cartTotal);
            
            const options = {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify({
                    userID: user.id,
                    total: cartTotal,
                    paymentID,
                    orderItems: cartItems
                })
            }
            const data = await fetch(`${serverAddress}/orders`, options);
            const dataJSON = await data.json()
            console.log(dataJSON)
            console.log(dataJSON.orderInfo)
            const order = dataJSON.orderInfo;

            console.log(order)
            setOrderDetails(order)
        }

        const resetCart = async () => {
            const options = {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                    },
            }
            await fetch(`${serverAddress}/cart/${shoppingSessionID}`, options)
        }
        addOrder();
        resetCart();
        dispatch(fetchCartSums(shoppingSessionID))
        }
        


    }, [user] )

    const checkForOrderCompletion = () => {
        if (!orderDetails) {
            return (<div className="order-confirmation">
                <Loading />
                hello
                </div>)
        } 
        else {
            return (
                <div className="order-confirmation">
                    <h2>Order Confirmed! Here are your order details:</h2>
                    <OrderTile orderDetails={orderDetails}/>
                </div>
            )
        }
    }

    return (
        <div clasName='order-confirmation-container'>
            {checkForOrderCompletion()}
        </div>
    )

}