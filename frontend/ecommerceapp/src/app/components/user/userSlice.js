import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        deleteUser: state => state.user = null,
        updateUserField: (state, action) => {
            const {field, data} = action.payload
            state.user[field] = data
        }
    }
});

export default userSlice.reducer;
export const { setUser, deleteUser, updateUserField } = userSlice.actions;
export const selectUser = state => state.user.user; 
