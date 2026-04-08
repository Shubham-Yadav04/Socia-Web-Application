
import './App.css';
import './index.css'
import MainPage from './UserPage/MainPage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './LandingPage/Home.js'
import VisitProfile from './UserPage/Components/VisitProfile.js';


function App() {
  return (
  

    
    <Router>
      <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/dashboard" element={<MainPage/>} />
      <Route path="/user/:id" element={<VisitProfile />} />
      </Routes>
    </Router>
 
  );
}

export default App;
