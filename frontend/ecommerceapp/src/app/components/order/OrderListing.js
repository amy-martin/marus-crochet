import React from "react"; 
import { ItemTile } from "../cart/ItemTile";
import { Loading } from "../miscellaneous/Loading";

export const OrderListing = (props) => {
    const {orderDetails, orderDetailsStatus} =  props;

    const {order_items: orderItems} = orderDetails

    const ifOrderItems = (orderItems) => {
        if (orderItems) {
            orderItems.map(item => {
                console.log('Item metadata:');
                console.log(item.metadata)
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