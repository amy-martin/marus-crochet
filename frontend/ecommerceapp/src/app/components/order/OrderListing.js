import React from "react"; 
import { ItemTile } from "../cart/ItemTile";
import { Loading } from "../miscellaneous/Loading";

export const OrderListing = (props) => {
    const {orderDetails, orderDetailsStatus} =  props;

    const {order_items: orderItems} = orderDetails
    return (
        <div className="order-listing-container"> 
            <h3>Order #: {orderDetails.id}</h3>
            {console.log(orderItems[0].metadata)}
            {orderItems ? orderItems.map(item => <ItemTile type='order-item' item={item} key={item.id}/>): <h4>Nothing to show</h4>}
            <h3>Total: {orderDetails.total}</h3>
        </div>
    )
} 