import { createSlice } from "@reduxjs/toolkit";

const flashSlice = createSlice({
    name: 'flash',
    initialState: {
        flashConfig: {
            display: 'none', 
            flashMessage: null,
            backgroundColor: null,
            className: null,
        }
    },
    reducers: {
        displayFlash: (state, action) => {
            state.flashConfig = {
                display: 'flex',
                flashMessage: action.payload.flashMessage,
                backgroundColor: action.payload.backgroundColor,
                className: action.payload.className ? action.payload.className: null,
            }
        },
        hideFlash: state => {
            state.flashConfig = {
                display: 'none',
                flashMessage: null,
                backgroundColor: null,
                className: null
            }
        }
    }
})

export const {displayFlash, hideFlash} = flashSlice.actions;
export const selectFlashConfig = state => state.flash.flashConfig;

export default flashSlice.reducer