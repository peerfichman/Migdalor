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
import GoodMorningProtocol from './Components/GoodMorningProtocol';
import ActivitiesRegistration from './Components/ActivitiesRegistration';
import ContactList from './Components/ContactList';

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
          <Route path="/good-morning-protocol" element={<GoodMorningProtocol/>} />
          <Route path="/activities-registration" element={<ActivitiesRegistration/>}/>
          <Route path="/Contacts" element={<ContactList/>} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
