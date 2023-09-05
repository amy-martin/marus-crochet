import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverAddress } from "../../../App";

export const fetchCartSums = createAsyncThunk(
    'cart/fetchSumDetails',
    async (shoppingSessionID, thunkAPI) => {
            try {
                const cartSumRequestOptions = {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                    }
                }
                const url = `${serverAddress}/cart/${shoppingSessionID}/cartSumDetails`;

                const response = await fetch(url, cartSumRequestOptions)
                const data = await response.json();
                return data
            } catch(e) {
                console.log(e)
            }
    }
)

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (shoppingSessionID, thunkAPI) => {
        try {
            const cartItemsRequestOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
                }
            }
            const response = await fetch(`${serverAddress}/cart/${shoppingSessionID}`, cartItemsRequestOptions)
            const data = await response.json();
            return data.cartItems

        } catch (e) {
            console.log(e.message)
            throw e
        }
    }
    
)
export const resetCart = createAsyncThunk(
    'cart/resetCart',
    async (shoppingSessionID, thunkAPI) => {
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
    // return success message possibly?
}
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartQuantity: 0,
        cartTotal: null,
        cartItems: null,
        quantityLoading: 'Idle',
        itemsLoading: 'Idle',
        resetLoading: 'Idle',
        error: null,
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartSums.pending, (state) => {
                state.quantityLoading = 'Loading'
            })
            .addCase(fetchCartSums.fulfilled, (state, action) => {
                state.quantityLoading = 'Successful';
                state.cartQuantity = action.payload.cartQuantity ? action.payload.cartQuantity: 0
                state.cartTotal = action.payload.cartTotal ? action.payload.cartTotal: 0

            })
            .addCase(fetchCartSums.rejected, (state, action) => {
                state.quantityLoading = 'Failed'
                state.error = action.error.message;
            })
            builder
            .addCase(fetchCartItems.pending, (state) => {
                state.itemsLoading = 'Loading'
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.itemsLoading = 'Successful';
                state.cartItems = action.payload
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.itemsLoading = 'Failed'
                state.error = action.error.message;
            })
            .addCase(resetCart.pending, (state) => {
                state.resetLoading = 'Loading'
            })
            .addCase(resetCart.fulfilled, (state) => {
                state.resetLoading = 'Successful';
                state.cartQuantity = 0;
                state.cartTotal = null;
                state.cartItems = null;
            })
            .addCase(resetCart.rejected, (state, action) => {
                state.resetLoading = 'Failed'
                state.error = action.error.message;
            })
    }
    
    
});


export const selectCartQuantity = state => state.cart.cartQuantity;
export const selectCartQuantityStatus = state => state.cart.quantityLoading;
export const selectCartItemsStatus = state => state.cart.itemsLoading;
export const selectCartTotal = state => state.cart.cartTotal
export const selectCartItems = state => state.cart.cartItems
export default cartSlice.reducer;