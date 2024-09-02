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
import FullCalendar from "./Components/Calendar/FullCalendar.jsx";
import NotificationProvider from "./NotificationsProvider/NotificationsProvider.jsx";
import Profile from "./Components/Profile.jsx";
import Obituaries from "./Components/Obituaries.jsx";
import Initiatives from "./Components/Initiatives.jsx";
import OpeningHours from "./Components/OpeningHours.jsx";
import TennantComitte from "./Components/TennantCommittee.jsx"
import ForgotPassword from "./Components/ForgotPassword.jsx";
const App = () => {

    return (
        <CacheRTL>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <NotificationProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
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
                    </NotificationProvider>
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
        ,
        {
            path: '/activitiesRegistration',
            element: <FullCalendar/>
        },
        {
            path: '/profile',
            element: <Profile/>
        },
        {
            path: '/obituaries',
            element: <Obituaries/>
        }  ,
        {
            path: '/creatingInitiative',
            element: <Initiatives/>
        }   ,
        {
            path: '/openingHours',
            element: <OpeningHours/>
        } ,
        {
            path: '/tenantCommittee',
            element: <TennantComitte/>
        }
    ];

    return useRoutes(routes);
}

export default App;

