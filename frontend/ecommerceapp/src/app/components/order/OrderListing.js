import React from "react"; 
import { ItemTile } from "../cart/ItemTile";
import { Loading } from "../miscellaneous/Loading";
import { serverAddress } from "../../App";

export const OrderListing = (props) => {
    const {orderDetails, orderDetailsStatus} =  props;
    const {order_items: orderItems} = orderDetails
    let orderList = []

    const fetchOrderItemDetails = async (desc) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                    }
                }
            const descWithUnderscores = desc.replace(/ /g, '_')
            const url = `${serverAddress}/product/desc/${descWithUnderscores}`;
            
            const response = await fetch(url, options);
            const data = response.json();
            return data
        } catch (e) {
            throw e
        }
    }
    const ifOrderItems = (orderItems) => {
        if (orderItems) {
            orderItems.map(async item => {
                const order = await fetchOrderItemDetails(item.description);
                orderList.push(order)
            })

            orderList.map(item => {
                return <ItemTile type='order-item' item={item} key={item.id}/>
            })
        } else {
            return <h4>Nothing to show</h4>
        }
    }
    return (
        <div className="order-listing-container"> 
            <h3>Order #: {orderDetails.id}</h3>
            {ifOrderItems(orderItems)}
            <h3>Total: {orderDetails.total}</h3>
        </div>
    )
} 