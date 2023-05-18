import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './components/cart/slice/cartSlice' 
import sideBarReducer from "./components/navbar/slice/sideBarSlice";
import categoryReducer from "./components/navbar/slice/categorySlice"
import loginReducer from "./components/login/loginSlice";
import userReducer from "./components/user/userSlice";


export default configureStore({
    reducer: {
        cart: cartReducer,
        sidebar: sideBarReducer,
        category: categoryReducer,
        login: loginReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})