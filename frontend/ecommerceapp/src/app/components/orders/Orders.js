import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders, selectOrders, selectOrdersStatus } from "./slice/allOrdersSlice"
import userSlice, { selectUser } from "../user/userSlice"
import { Loading } from "../miscellaneous/Loading"
import { FailedToLoad } from "../miscellaneous/FailedToLoad"
import { OrderListing } from "../order/OrderListing"
import { selectShoppingSessionID } from "../cart/slice/shoppingSessionSlice"
import { retrieveOrder } from "../order/slice/orderSlice"

export const Orders = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders);
    const ordersStatus = useSelector(selectOrdersStatus)

    useEffect(() => {
        dispatch(getAllOrders(user));
    }, [user, dispatch]);

    useEffect(() => {
    }, [user, orders])
 
    const retrieveOrders = () => {
        if (ordersStatus === 'Loading') {
            return <Loading />
        } else if (ordersStatus=== 'Failed') {
            return <FailedToLoad />
        } else if (!orders || orders.length === 0) {
            return <h2 className="empty-order-page-header">No order has been placed</h2>
        } else if (orders.length > 0) {
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