import React, { useEffect, useState } from "react"; 
import { ItemTile } from "../cart/ItemTile";
import { Loading } from "../miscellaneous/Loading";
import { serverAddress } from "../../App";

export const OrderListing = (props) => {
    const { orderDetails } = props;
    const {order_items: orderItems} = orderDetails

    const displayOrder = () => {
        return (
            <div className="order-container">
                <h3>Order #: {(orderDetails.id).substr(-10)}</h3>
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
            {orderItems.length > 0 ? displayOrder(): <Loading />}
        </div>);
};
