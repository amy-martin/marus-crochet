import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/homepage/HomePage';
import { LogIn } from './components/login/LogIn';
import { NavBar } from './components/navbar/NavBar';
import { Register } from './components/register/Register';
import { ProductListing } from './components/products/ProductListing';
import { Product } from './components/products/Product';
import store from './store';
import { Provider } from 'react-redux';
import { NavBarSideBar } from './components/navbar/NavBarSideBar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <header>
            <NavBar />
          </header>
          <main>
            <NavBarSideBar />
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/login' element={<LogIn />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/products/:category?' element={<ProductListing />}/>
              <Route path='/product/:id' element={<Product />} />
            </Routes>
          </main>
        </div>

      </Router>
    </Provider>
  );
}

export default App;
