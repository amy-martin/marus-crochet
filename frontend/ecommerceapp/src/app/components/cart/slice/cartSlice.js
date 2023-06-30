import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalCartQuantity: 0

    },
    reducers: {
        clearCart: state => {
            state.cartItems = [];
            state.totalCartQuantity = 0
        },
        addToCart: (state, action) => {
            state.cartItems.push(action.payload)
            state.totalCartQuantity = state.cartItems.length
        },
        deleteFromCart: (state, action) => {
            state.cartItems.filter((product) => product !== action.payload)
        }
    }
});

export const { clearCart, addToCart, deleteFromCart } = cartSlice.actions;
export const selectCartItems = state => state.cart.cartItems;
// export const selectCartQuantity = state => state.cart.quantity;

export default cartSlice.reducer;