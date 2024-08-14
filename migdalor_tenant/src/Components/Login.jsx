import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css'; // Uncomment this line after creating the CSS file
import LogoAndText from '../Images/LogoAndText.png';
import TextField from '@mui/material/TextField';

const apiUrl = "https://localhost:7149/api/Login/";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleForgotPassword = (event) => {
        event.preventDefault();
        navigate('/home');
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        
        fetch(apiUrl + "ResidentLogin", {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
        .then(res => {
            if (!res.ok) {
                console.log("HTTP error! status: ", res.status);
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(
            (result) => {
                console.log("Successfully logged in!", result); // Save the user data if needed
                onLogin(); // Call the onLogin callback if needed
                navigate('/home'); // Navigate to the home page
            },
            (error) => {
                console.log("Error during POST:", error);
            }
        );
    }

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={LogoAndText} alt="Logo" />
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <TextField 
                    id="username" 
                    label="שם משתמש" 
                    type="search" 
                    style={{ margin: '10px', width: '100%' }} 
                    inputProps={{ dir: 'rtl' }} 
                    InputLabelProps={{ style: { direction: 'rtl' } }}
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <TextField 
                    id="password" 
                    label="סיסמה" 
                    type="password" 
                    style={{ margin: '10px', width: '100%' }} 
                    inputProps={{ dir: 'rtl' }} 
                    InputLabelProps={{ style: { direction: 'rtl' } }}
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button type="submit" className="login-button">התחברות</button>
                <a href="/" className="forgot-password" onClick={handleForgotPassword}>שכחתי סיסמה</a>
            </form>
        </div>
    );
}

export default Login;
