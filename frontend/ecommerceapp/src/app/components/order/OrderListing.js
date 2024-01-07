import React, { useEffect, useState } from "react"; 
import { ItemTile } from "../cart/ItemTile";
import { Loading } from "../miscellaneous/Loading";
import { serverAddress } from "../../App";

export const OrderListing = (props) => {
    const { orderDetails } = props;
    const { order_items: orderItems } = orderDetails;

    const [orderList, setOrderList] = useState([]);

    // useEffect(() => {
    //     const fetchOrderItemDetails = async (desc) => {
    //         try {
    //             const options = {
    //                 method: 'GET',
    //                 mode: 'cors',
    //                 credentials: 'include',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     "Content-Type": "application/json"
    //                 }
    //             };

    //             const descWithUnderscores = desc.replace(/ /g, '_');
    //             const url = `${serverAddress}/product/desc/${descWithUnderscores}`;

    //             const response = await fetch(url, options);
    //             const data = await response.json();
    //             return data.product;
    //         } catch (e) {
    //             throw e;
    //         }
    //     };

    //     const mapToOrderList = async () => {
    //         const promises = orderItems.map(async item => {
    //             const productDetails = await fetchOrderItemDetails(item.description);
    //             return {
    //                 product: productDetails,
    //                 quantity: item.quantity
    //             };
    //         });

    //         const result = await Promise.all(promises);
    //         setOrderList(result);
    //     };

    //     if (orderItems.length > 0) {
    //         mapToOrderList();
    //     }
    // }, [orderItems]);

    const displayOrder = () => {
        return (
            <div>
                <h3>Order #: {orderDetails.id}</h3>
                {orderList.length > 0 ? (
                    orderList.map(({ product, quantity }) => (
                        product && product.length > 0 ? (
                            <ItemTile type='order-item' item={product} key={product.id} quantity={quantity} />
                        ) : (
                            null  // or a placeholder if you want
                        )
                    ))
                ) : (
                    <Loading />
                )}
                <h3>Total: {orderDetails.total}</h3>
            </div>
        );
    };

    return <div className="order-listing-container">{displayOrder()}</div>;
};
