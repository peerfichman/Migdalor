// src/components/MainMenu.js

import React from 'react';
import '../CSS/Home.css'; // Create a corresponding CSS file for styles
import Logo from '../Images/Logo.png';
import IconGrid from './IconGrid.jsx';

const MainMenu = () => {
  return (
    <div className="menu-container">
      <header className="menu-header">
        <img src="https://via.placeholder.com/100" alt="Logo" className="menu-logo" />
        <h2 className="welcom-header">שלום שושנה</h2>
      </header>
      <div className="menu-grid">
        <IconGrid />
      </div>
    </div>
  );
}

export default MainMenu;
