import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: null
    },
    reducers: {
        setToLoggedIn: state => { 
            state.isLoggedIn = true
        },
        setToLoggedOut: state => {
            state.isLoggedIn = false
        }
    }
});

export default loginSlice.reducer;
export const {setToLoggedIn, setToLoggedOut} = loginSlice.actions;
export const selectisLoggedIn = state => state.login.isLoggedIn;





