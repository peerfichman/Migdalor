// src/components/MainMenu.js

import React, {useContext} from 'react';
import '../CSS/Home.css'; // Create a corresponding CSS file for styles
import Logo from '../Images/Logo.png';
import IconGrid from './IconGrid.jsx';
import {UserContext} from "../Auth/Auth.jsx";





const MainMenu = () => {

    const { user } = useContext(UserContext); // Retrieve the user ID from context
  return (
    <div className="menu-container">
      <header className="menu-header">
        <img src={Logo} alt="Logo" className="menu-logo" />
        <h2 className="welcom-header">שלום {user.firstName}</h2>
        
      </header>
      <div className="menu-grid">
        <IconGrid />
      </div>
      <div></div>
    </div>
  );
}

export default MainMenu;
