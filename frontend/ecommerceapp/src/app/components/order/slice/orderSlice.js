import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverAddress } from "../../../App";
import { resetCart } from "../../cart/slice/cartSlice";


export const retrieveOrder = createAsyncThunk(
    'order/retrieveOrder',
    async (params, thunKAPI) => {
        const {user, orderID} = params
        const options = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        }
        const data = await fetch(`${serverAddress}/orders/${orderID}`, options);
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
            .addCase(retrieveOrder.pending, (state) => {
                state.loading = 'Loading'
            })
            .addCase(retrieveOrder.fulfilled, (state, action) => {
                state.loading = 'Successful';
                state.orderDetails = action.payload;
            })
            .addCase(retrieveOrder.rejected, (state, action) => {
                state.loading = 'Failed';
                state.error = action.error.message
                console.log(state.error)
            })
    }
})




export const selectOrderDetails = state => state.order.orderDetails;
export const selectOrderDetailsStatus = state => state.order.loading;
export const selectOrderQueryType = state => state.order.queryType
export const {setTotalToSend, setItemsToSend} = orderSlice.actions
export default orderSlice.reducer;


