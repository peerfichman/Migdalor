import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(
        {
            "id": 415124019,
            "firstName": "פאר זוהר",
            "lastName": "פיכמן",
            "phoneNumber": "0526770546",
            "residentID": "666",
            "dateOfBirth": "2024-09-26T00:00:00",
            "previousAddress": "רמת גן",
            "seniority": null,
            "currentAddress": null,
            "profession": "שינוי",
            "email": "peerfikhman@gmail.com",
            "aboutMe": null,
            "username": "666",
            "password": "a165e952",
            "departmentId": null
        }

    );
    const login = async (username, password) => {
        try {
            const response = await axios.post('https://localhost:7149/api/login/ResidentLogin', {
                username,
                password,
            });
            const { token, resident  } = response.data;
            localStorage.setItem('token', token);
            setUser(resident);
            console.log(resident)
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
        user,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
