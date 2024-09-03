// src/components/MainMenu.js

import React, {useContext} from 'react';
import '../CSS/Home.css'; // Create a corresponding CSS file for styles
import IconGrid from './IconGrid.jsx';
import {UserContext} from "../Auth/Auth.jsx";
import LogoutButton from "./LogoutButton.jsx";


const MainMenu = () => {

    const {user} = useContext(UserContext); // Retrieve the user ID from context
    return (
        <div className="menu-container">
            <LogoutButton/>
            <h2 className="welcom-header">שלום {user.firstName}</h2>

            <div className="menu-grid">
                <IconGrid/>
            </div>
            <div className="lower-div"></div>
        </div>
    );
}

export default MainMenu;
