import { createSlice } from "@reduxjs/toolkit";


export const shoppingSessionSlice = createSlice({
    name: 'shoppingSession',
    initialState: {
        id: null
    }, 
    reducers: {
        setShoppingSessionID: (state, action) => {
            state.id = action.payload
        }
    }
})


export const {setShoppingSessionID} = shoppingSessionSlice.actions;
export const selectShoppingSessionID = state => state.shoppingSession.id;

export default shoppingSessionSlice.reducer