import React, {useContext, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import '../CSS/LoginPage.css'; // Uncomment this line after creating the CSS file
import LogoAndText from '../Images/LogoAndText.png';
import TextField from '@mui/material/TextField';
import {UserContext} from "../Auth/Auth.jsx";

const Login = () => {
    const{user, login} = useContext(UserContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleForgotPassword = (event) => {
        event.preventDefault();
        navigate('/forgotpassword');
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        await login(formData.username, formData.password);
        navigate("/");
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
