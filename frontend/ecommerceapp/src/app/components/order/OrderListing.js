import React, { useEffect, useState } from "react"; 
import { ItemTile } from "../cart/ItemTile";
import { Loading } from "../miscellaneous/Loading";
import { serverAddress } from "../../App";

export const OrderListing = (props) => {
    const { orderDetails } = props;
    const {order_items: orderItems} = orderDetails

    const displayOrder = () => {
        return (
            <div>
                <h3>Order #: {orderDetails.id}</h3>
                {orderItems.length > 0 ? (
                    orderItems.map(({ product, quantity }) => (
                        product ? (
                            <ItemTile type='order-item' item={product} key={product.id} quantity={quantity} />
                        ) : (
                            null 
                        )
                    ))
                ) : (
                    <Loading />
                )}
                <h3>Total: {orderDetails.total}</h3>
            </div>
        );
    };

    return (
        <div className="order-listing-container">
            {console.log('Products:')}
            {(orderItems.map(order => console.log(order.product)))}
            {orderItems.length > 0 ? displayOrder(): <Loading />}
        </div>);
};
