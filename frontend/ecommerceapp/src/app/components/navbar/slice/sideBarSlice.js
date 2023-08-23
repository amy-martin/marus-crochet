import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        display: 'none'
    },
    reducers: {
        changeDisplayByValue: (state, action) => {
            state.display = action.payload
        },
        toggleDisplay: state => {
            if (state.display === 'none') {
                state.display = 'flex'
            } else state.display = 'none'
        },
        turnOffDisplay: state => {
            state.display = 'none'
        }
    }
});


export default sideBarSlice.reducer;
export const { toggleDisplay, changeDisplayByValue, turnOffDisplay } = sideBarSlice.actions;
export const selectSideBarDisplay = (state) => state.sidebar.display;

