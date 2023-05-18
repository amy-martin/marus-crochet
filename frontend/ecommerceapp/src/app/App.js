import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import store from './store';
import { HomePage } from './components/homepage/HomePage';
import { LogIn } from './components/login/LogIn';
import { NavBar } from './components/navbar/NavBar';
import { Register } from './components/register/Register';
import { ProductListing } from './components/products/ProductListing';
import { Product } from './components/products/Product';
import { Provider } from 'react-redux';
import { NavBarSideBar } from './components/navbar/NavBarSideBar';
import { AboutUs } from './components/aboutUs/AboutUs';
import { ContactUs } from './components/contactUs/ContactUs';
import { NewProductListing } from './components/products/NewProductListing';
import { Account } from './components/user/Account';
import { AccountUpdateForm } from './components/user/AccountUpdateForm';


// IMPORT IS LOGGED IN AND THEN CONDITIONALLY RENDER ACCOUNT
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <main>
            <NavBarSideBar />
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/login' element={<LogIn />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/products/:category?' element={<ProductListing />}/>
              <Route path='/products/new' element={<NewProductListing />}/>
              <Route path='/product/:id' element={<Product />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/contact-us' element={<ContactUs />}/>
              <Route path='/profile' element={<Account />}/>
              <Route path='/profile/edit' element={<AccountUpdateForm />}/>
            </Routes>
          </main>
        </div>

      </Router>
    </Provider>
  );
}

export default App;
