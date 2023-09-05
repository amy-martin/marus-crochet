import React from "react"; 
import { ItemTile } from "../cart/ItemTile";
import { Loading } from "../miscellaneous/Loading";

export const OrderListing = (props) => {
    const {orderDetails, orderDetailsStatus} =  props;

    const {order_items: orderItems} = orderDetails
    return (
        <div className="order-listing-container"> 
            <h3>Order #: {orderDetails.id}</h3>
            {orderItems.map(item => <ItemTile type='order-item' item={item} key={item.id}/>)}
            <h3>Total: {orderDetails.total}</h3>
        </div>
    )
} 