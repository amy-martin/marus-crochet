import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCartQuantity = createAsyncThunk(
    'cart/fetchCartQuantity',
    async(shoppingSessionID, thunkAPI) => {
            try {
                const cartQuantityRequestOptions = {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                    }
                }
                const url = `http://localHost:3000/cart/${shoppingSessionID}/cartQuantity`;

                const response = await fetch(url, cartQuantityRequestOptions)
                const data = await response.json();
                return data.cartQuantity
            } catch(e) {
                console.log(e)
            }
    }
)
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartQuantity: 0,
        loading: 'Idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartQuantity.pending, (state, action) => {
                state.loading = 'Loading'
            })
            .addCase(fetchCartQuantity.fulfilled, (state, action) => {
                state.loading = 'Successful';
                state.cartQuantity = action.payload
            })
            .addCase(fetchCartQuantity.rejected, (state, action) => {
                state.loading = 'Failed'
                state.error = action.error.message;
            })
    }
    
    
});


export const selectCartQuantity = state => state.cart.cartQuantity;
export const selectCartStatus = state => state.cart.loading;
export default cartSlice.reducer;