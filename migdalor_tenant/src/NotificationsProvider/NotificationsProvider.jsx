import React, {createContext, useEffect, useState} from 'react'
import {Snackbar} from "@mui/material";
import { io } from "socket.io-client";

export const NotificationCtx = createContext()

const  NotificationProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState('');
    
    const handleClose = ()=> setIsVisible(false);
        useEffect(() => {
            // Initialize WebSocket connection
            const socket = new WebSocket('wss://localhost:7149/ws');

            // Listen for messages
            socket.onmessage = (event) => {
                console.log('Message from server ', event.data);
                setMessage(event.data);
                setIsVisible(true)
            };

            // Error handling
            socket.onerror = (error) => {
                console.error('WebSocket Error: ', error);
            };

            // Handle connection open
            socket.onopen = () => {
                console.log('WebSocket connection established');
            };

            // Handle connection close
            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };

            // Clean up WebSocket connection when the component unmounts
            return () => {
                socket.close();
            };

    }, []);


    return (<NotificationCtx.Provider value={{setIsVisible}}>
        {children}
        {isVisible &&
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal:'right'}}
                open={isVisible}
                onClose={handleClose}
                message={message}
                key={'topRightNotification'}
            />}
    </NotificationCtx.Provider>)
}

export default NotificationProvider;