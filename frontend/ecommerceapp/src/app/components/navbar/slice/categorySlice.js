import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        dropdown: {display: 'none'}
    },
    reducers: {
        changeCategoryDropdownDisplayByValue: (state, action) => {
            state.dropdown.display = action.payload
        },
        displayDropdown: state => {
            state.dropdown.display = 'flex'
        },
        hideDropdown: state => {
            state.dropdown.display = 'none'
        },
        toggleDropdown: state => {
            if (state.dropdown.display == 'none') {
                state.dropdown.display = 'flex'
            } else state.dropdown.display = 'none'
        }
    }
});

export default categorySlice.reducer;
export const { displayDropdown, changeCategoryDropdownDisplayByValue, hideDropdown, toggleDropdown } = categorySlice.actions;
export const selectCategoryDropdownDisplay = (state) => state.category.dropdown.display;