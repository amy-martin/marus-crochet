import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { selectisLoggedIn } from './components/login/loginSlice';
import { HomePage } from './components/homepage/HomePage';
import { LogIn } from './components/login/LogIn';
import { NavBar } from './components/navbar/NavBar';
import { Register } from './components/register/Register';
import { ProductListing } from './components/products/ProductListing';
import { Product } from './components/products/Product';
import { NavBarSideBar } from './components/navbar/NavBarSideBar';
import { AboutUs } from './components/aboutUs/AboutUs';
import { ContactUs } from './components/contactUs/ContactUs';
import { NewProductListing } from './components/products/NewProductListing';
import { useDispatch, useSelector } from 'react-redux';
import { Account } from './components/user/Account';
import { Redirect } from './components/miscellaneous/Redirect';
import { AccountUpdateForm } from './components/user/AccountUpdateForm';
import { Cart } from './components/cart/Cart';
import { PaymentSuccess } from './components/order/PaymentSuccess';
import { useEffect } from 'react';
import { login } from './helpers/login';
import { fetchCartItems, fetchCartSums } from './components/cart/slice/cartSlice';
import { selectShoppingSessionID } from './components/cart/slice/shoppingSessionSlice';
import { Orders } from './components/orders/Orders';

export const serverAddress = 'https://marus-crochet.onrender.com';


export function App() {
  const shoppingSessionID = useSelector(selectShoppingSessionID)
  const isLoggedIn = useSelector(selectisLoggedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    login(dispatch);
    if (isLoggedIn && shoppingSessionID) {
      dispatch(fetchCartItems(shoppingSessionID));
      dispatch(fetchCartSums(shoppingSessionID));
    }

  }, [isLoggedIn, shoppingSessionID, dispatch])

  useEffect(() => {
    if (isLoggedIn && shoppingSessionID) {
      dispatch(fetchCartSums(shoppingSessionID))
  }
  })

  return (
      <Router>
        <div>
          <NavBar />
          <main>
            <NavBarSideBar />
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/login/:status?' element={<LogIn />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/products/:category?' element={<ProductListing />}/>
              <Route path='/products/new' element={<NewProductListing />}/>
              <Route path='/product/:id' element={<Product />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/contact-us' element={<ContactUs />}/>
              <Route path='/profile' element={isLoggedIn ? <Account />: <Redirect />}/>
              <Route path='/profile/edit' element={isLoggedIn ? <AccountUpdateForm />: <Redirect />}/>
              <Route path='/cart' element={isLoggedIn ? <Cart />: <Redirect />}/>
              <Route path='/success' element={isLoggedIn ? <PaymentSuccess />: <Redirect />}/>
              <Route path='/orders' element={isLoggedIn ? <Orders />: <Redirect />}/>
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;

