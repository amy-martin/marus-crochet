import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './components/cart/slice/cartSlice' 
import sideBarReducer from "./components/navbar/slice/sideBarSlice";

export default configureStore({
    reducer: {
        cart: cartReducer,
        sidebar: sideBarReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})