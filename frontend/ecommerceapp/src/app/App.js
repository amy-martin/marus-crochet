import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/homepage/HomePage';
import { LogIn } from './components/login/LogIn';
import { NavBar } from './components/navbar/NavBar';
import { Register } from './components/register/Register';
import { ProductListing } from './components/products/ProductListing';

function App() {
  return (
    <Router>
      <div>
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/login' element={<LogIn />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/products/:category?' element={<ProductListing />}/>

          </Routes>
        </main>
      </div>

    </Router>
  );
}

export default App;
