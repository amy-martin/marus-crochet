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
import { useSelector } from 'react-redux';
import { Account } from './components/user/Account';
import { Redirect } from './components/miscellaneous/Redirect';
import { AccountUpdateForm } from './components/user/AccountUpdateForm';
import { Cart } from './components/cart/Cart';

function App() {
  const isLoggedIn = useSelector(selectisLoggedIn)
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
              <Route path='/cart' element={isLoggedIn ? <Cart />: <Redirect/>}/>
            </Routes>
          </main>
        </div>

      </Router>
  );
}

export default App;
