
import { setToLoggedIn } from "../components/login/loginSlice";
import { setUser } from "../components/user/userSlice";
import { setShoppingSessionID } from "../components/cart/slice/shoppingSessionSlice";


export const login = async (dispatch) => {
    const user = localStorage.getItem('user') ? (localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')): null): null;
    const shoppingSessionID = localStorage.getItem('shoppingSessionID') ? (localStorage.getItem('shoppingSessionID') !== 'undefined' ? localStorage.getItem('shoppingSessionID'): null): null;


    if (user && shoppingSessionID) {
        try {
            dispatch(setUser(user));
            dispatch(setToLoggedIn());
            dispatch(setShoppingSessionID(shoppingSessionID))
            }
        catch (e) {
            console.log(e)
        }

        } 
    }