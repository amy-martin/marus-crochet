import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverAddress } from "../../../App";

export const fetchCartItemTotalPrice = createAsyncThunk(
    'cartItemTotalPrice/fetchCartItemTotalPrice',
    async( options, thunkAPI) => {
        const {shoppingSessionID, productId} = options
            try {
                const cartItemTotalPriceRequestOptions = {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                    }
                }
                const url = `${serverAddress}/cart/${shoppingSessionID}/cartItem/${productId}`;
                const response = await fetch(url, cartItemTotalPriceRequestOptions)
                const data = await response.json();
                return {productId, cartItemTotalPrice: data.cartItemTotalPrice}
            } catch(e) {
                console.log(e)
            }
    }
)

export const cartItemTotalPriceSlice = createSlice({
    name: 'cartItemTotalPrice',
    initialState: {
        loading: 'Idle',
        error: null,
        totalPrices: {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItemTotalPrice.pending, (state, action) => {
                state.loading = 'Loading'
            })
            .addCase(fetchCartItemTotalPrice.fulfilled, (state, action) => {
                state.loading = 'Successful';
                state.totalPrices[action.payload.productId] = action.payload.cartItemTotalPrice
            })
            .addCase(fetchCartItemTotalPrice.rejected, (state, action) => {
                state.loading = 'Failed';
                state.error = action.error.message
            })
    }
    })

export const selectCartItemTotalPrices = state => state.cartItemTotalPrice.totalPrices;
export const selectCartItemTotalPriceStatus = state => state.cartItemTotalPrice.loading;
export default cartItemTotalPriceSlice.reducer;