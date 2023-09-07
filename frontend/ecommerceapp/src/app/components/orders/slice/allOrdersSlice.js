import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverAddress } from "../../../App";



export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (user, thunkAPI) => {
        const options = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        }
        console.log(user.id)
        const data = await fetch(`${serverAddress}/orders/${user.id}`, options);
        const dataJSON = await data.json()
        const orders = dataJSON.orders;
        
        return orders
    }
)

export const allOrdersSlice = createSlice({
    name:'orders',
    initialState: {
        orders: null,
        loading: 'Idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.loading = 'Loading'
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = 'Successful';
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = 'Failed';
                state.error = action.error.message
                console.log(state.error)
            })
    }
})




export const selectOrders = state => state.orders.orders;
export const selectOrdersStatus = state => state.orders.loading;
export default allOrdersSlice.reducer;