import React, { createContext, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const UserContext = createContext();
const apiUrl = "https://localhost:7149/api/Login/";

export const UserProvider = ({ children }) => {
    const [activeUser, setUser] = useState(null);

    const login = async (username, password) => {
        try {
           await fetch(apiUrl+"Login",{
                method: 'POST',
                body: JSON.stringify({username,password}),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8' // very important to add the 'charset=UTF-8'!!!!
                })
            })
                .then(res => {
                    if (!res.ok) {
                        console.log("HTTP error! status: ", res.status);
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json()
                })
                .then(
                    (result) => {
                        console.log("Successfully logged in!", result);//save the user
                        const { token, user  } = result;
                        localStorage.setItem('token', token);
                        setUser(user);
                    },
                    (error) => {
                        console.log("Error during POST:", error);
                    }
                );


        } catch (error) {
            throw new Error('Login failed');
        }
    };

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Value to be passed to provider
    const contextValue = {
        activeUser,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
