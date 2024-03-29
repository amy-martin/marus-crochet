import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './components/cart/slice/cartSlice' 
import sideBarReducer from "./components/navbar/slice/sideBarSlice";
import categoryReducer from "./components/navbar/slice/categorySlice"
import loginReducer from "./components/login/loginSlice";
import userReducer from "./components/user/userSlice";
import flashReducer from "./components/miscellaneous/flash/flashSlice";
import shoppingSessionReducer from "./components/cart/slice/shoppingSessionSlice";
import cartItemTotalPriceSliceReducer from "./components/cart/slice/cartItemTotalPriceSlice";
import orderReducer from "./components/order/slice/orderSlice";
import ordersReducer from "./components/orders/slice/allOrdersSlice";


export default configureStore({
    reducer: {
        cart: cartReducer,
        sidebar: sideBarReducer,
        category: categoryReducer,
        login: loginReducer,
        user: userReducer,
        flash: flashReducer,
        shoppingSession: shoppingSessionReducer,
        cartItemTotalPrice: cartItemTotalPriceSliceReducer,
        order: orderReducer,
        orders:ordersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})