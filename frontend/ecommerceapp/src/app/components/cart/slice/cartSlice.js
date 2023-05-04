import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 0
    },
    reducers: {
        clearQuantity: state => state.quantity = 0,
        changeByAmount: (state, action) => state.quantity = action.payload
    }
});

export const { clearQuantity, changeByAmount } = cartSlice.actions;
export const selectQuantity = state => state.cart.quantity;

export default cartSlice.reducer;