import React, {useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter, useRoutes} from 'react-router-dom';
import {UserContext, UserProvider} from './Auth/Auth.jsx';
import theme from './Theme/Theme.jsx'
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import GoodMorningProtocol from "./Components/GoodMorningProtocol.jsx";
import {ThemeProvider} from '@mui/material/styles';
import Messages from "./Components/Messages.jsx";
import CacheRTL from "./Cache/CacheRTL.jsx";

const App = () => {

    return (
        <CacheRTL>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route
                                path="/*"
                                element={
                                    <ProtectedRoute>
                                        <AppRoutes/>
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            </ThemeProvider>
        </CacheRTL>
    );
}

const AppRoutes = () => {
    const routes = [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/home',
            element: <Home/>
        },
        {
            path: '/gmp',
            element: <GoodMorningProtocol/>
        },
        {
            path: '/goodMorningProtocol',
            element: <GoodMorningProtocol/>
        },
        {
            path: '/messages',
            element: <Messages/>
        }
    ];

    return useRoutes(routes);
}

export default App;

