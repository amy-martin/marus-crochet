import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/homepage/HomePage';
import { LogIn } from './components/login/LogIn';

function App() {
  return (
    <Router>
      <div>
        {/* <NavBar /> */}
        <main>
          <Routes>
            <Route path='' element={<HomePage />}/>
            <Route path='/login' element={<LogIn />}/>
          </Routes>
        </main>
      </div>

    </Router>
  );
}

export default App;
