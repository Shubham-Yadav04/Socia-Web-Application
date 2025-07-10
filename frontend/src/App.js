
import './App.css';
import './index.css'
import MainPage from './UserPage/MainPage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './LandingPage/Home.js'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/dashboard" element={<MainPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
