import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Auth/Auth.jsx';

const ProtectedRoute = ({ children }) => {
    const {  activeUser} = useContext(UserContext);
    console.log("activeuser", activeUser)

    return activeUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

