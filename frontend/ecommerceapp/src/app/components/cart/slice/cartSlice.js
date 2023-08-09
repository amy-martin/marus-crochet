import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCartQuantity = createAsyncThunk(
    'cart/fetchCartQuantity',
    async (shoppingSessionID, thunkAPI) => {
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
            const response = await fetch(`http://localHost:3000/cart/${shoppingSessionID}`, cartItemsRequestOptions)
            const data = await response.json();
            return data.cartItems

        } catch (e) {
            console.log(e.message)
            throw e
        }
    }
    
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartQuantity: 0,
        cartItems: null,
        quantityLoading: 'Idle',
        error: null,
        itemsLoading: 'Idle'
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartQuantity.pending, (state, action) => {
                state.quantityLoading = 'Loading'
            })
            .addCase(fetchCartQuantity.fulfilled, (state, action) => {
                state.quantityLoading = 'Successful';
                state.cartQuantity = action.payload
            })
            .addCase(fetchCartQuantity.rejected, (state, action) => {
                state.quantityLoading = 'Failed'
                state.error = action.error.message;
            })
            builder
            .addCase(fetchCartItems.pending, (state, action) => {
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
    }
    
    
});


export const selectCartQuantity = state => state.cart.cartQuantity;
export const selectCartQuantityStatus = state => state.cart.quantityLoading;
export const selectCartItemsStatus = state => state.cart.itemsLoading;
export const selectCartItems = state => state.cart.cartItems
export default cartSlice.reducer;