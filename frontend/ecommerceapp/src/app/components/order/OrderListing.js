import React, { useEffect } from "react"; 
import { ItemTile } from "../cart/ItemTile";
import { Loading } from "../miscellaneous/Loading";
import { serverAddress } from "../../App";

export const OrderListing = (props) => {
    const {orderDetails, orderDetailsStatus} =  props;
    const {order_items: orderItems} = orderDetails
    let orderList = []
    useEffect(() => {
        if (orderItems.length > 0) {
            mapToOrderList(orderItems);
        }
    }, [orderItems])
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
    const mapToOrderList = (orderItems) => {
            orderItems.map(async item => {
                const product = await fetchOrderItemDetails(item.description)
                console.log(product)
            })
        
    }
    return (
        <div className="order-listing-container"> 
            <h3>Order #: {orderDetails.id}</h3>
            {orderList.length > 0 ? orderList.map(item => {
                return <ItemTile type='order-item' item={item} key={item.id}/>
            }): <Loading />}
            <h3>Total: {orderDetails.total}</h3>
        </div>
    )
} 