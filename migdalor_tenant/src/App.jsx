import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Profile from './Components/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("User logged in");
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/Profile" element={<Profile/>}  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
