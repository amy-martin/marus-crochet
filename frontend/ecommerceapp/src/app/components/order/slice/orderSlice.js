import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverAddress } from "../../../App";
import { resetCart } from "../../cart/slice/cartSlice";

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (params, thunKAPI) => {
        const {shoppingSessionID, user, cartTotal, paymentID, cartItems} = params
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
                },
            body: JSON.stringify({
                shoppingSessionID,
                userID: user.id,
                total: cartTotal,
                paymentID,
                orderItems: cartItems
            })
        }
        let order
        await fetch(`${serverAddress}/orders`, options)
        .then(res => res.json())
        .then(resJSON => {
            order = resJSON.orderDetails
        })
        .then(async () => {
            const options = {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                    },
            }
            await fetch(`${serverAddress}/cart/${shoppingSessionID}`, options)
        })
    
        return order
    
    }
)


export const getOrderDetails = createAsyncThunk(
    'order/getOrderDetails',
    async (params, thunKAPI) => {
        const {user, paymentID} = params
        const options = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        }
        const data = await fetch(`${serverAddress}/orders/${user.id}/${paymentID}`, options);
        const dataJSON = await data.json()

        const order = dataJSON.orderDetails;
  
        return order
    
    }
)



export const orderSlice = createSlice({
    name:'order',
    initialState: {
        orderDetails: null,
        totalToSend: null,
        itemsToSend: null,
        loading: 'Idle',
        error: null,
        queryType: null
    },
    reducers: {
        setTotalToSend: (state, action) => {
            state.totalToSend = action.payload
        },
        setItemsToSend: (state, action) => {
            state.itemsToSend = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state) => {
                state.loading = 'Loading'
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = 'Successful';
                state.orderDetails = action.payload
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = 'Failed';
                state.error = action.error.message
                console.log(state.error)
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = 'Loading'
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = 'Successful';
                state.orderDetails = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = 'Failed';
                state.error = action.error.message
                console.log(state.error)
            })
    }
})




export const selectOrderDetails = state => state.order.orderDetails;
export const selectOrderDetailsStatus = state => state.order.loading;
export const selectOrderQueryType = state => state.order.queryType
export const selectItemsToSend = state => state.order.itemsToSend;
export const selectTotalToSend = state => state.order.totalToSend;
export const {setTotalToSend, setItemsToSend} = orderSlice.actions
export default orderSlice.reducer;


