import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/homepage/HomePage';

function App() {
  return (
    <Router>
      <div>
        {/* <NavBar /> */}
        <main>
          <Routes>
            <Route path='' element={<HomePage />}/>
          </Routes>
        </main>
      </div>

    </Router>
  );
}

export default App;
