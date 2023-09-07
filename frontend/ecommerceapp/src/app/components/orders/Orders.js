import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders, selectOrders, selectOrdersStatus } from "./slice/allOrdersSlice"
import userSlice, { selectUser } from "../user/userSlice"
import { Loading } from "../miscellaneous/Loading"
import { FailedToLoad } from "../miscellaneous/FailedToLoad"
import { OrderListing } from "../order/OrderListing"
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice"

export const Orders = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders);
    const ordersStatus = useSelector(selectOrdersStatus)
    const shoppingSessionID = useSelector(selectShoppingSessionID)
    useEffect(() => {
        dispatch(getAllOrders(user));
        console.log(shoppingSessionID)
    }, [user])
 
    const retrieveOrders = () => {
        if (ordersStatus === 'Loading') {
            return <Loading />
        } else if (ordersStatus=== 'Failed') {
            return <FailedToLoad />
        } else if (!orders || orders.length === 0) {
            return <h2>No order has been placed</h2>
        } else {
            return (
                <div className="orders-listing-container">
                    <h2>Your Orders:</h2>
                    {orders.map(order => <OrderListing orderDetails={order} key={order.id}/>)}
                </div>
            )
        }
    }

    return (
        <div className="orders-container">
            
            {retrieveOrders()}
        </div>
    )
}