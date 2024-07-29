import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css'; // Uncomment this line after creating the CSS file
import LogoAndText from '../Images/LogoAndText.png';
import TextField from '@mui/material/TextField';



const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleForgotPassword = (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        navigate('/home');
    }

    const handleLogin = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onLogin();
        navigate('/home');
    }

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={LogoAndText} alt="Logo" />
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                {/* <input type="text" placeholder="שם משתמש" className="login-input" />
                <input type="password" placeholder="סיסמה" className="login-input" /> */}
                <TextField id="username" label="שם משתמש" type="search" style={{ margin: '10px' ,width:'100%'}} inputProps={{ dir: 'rtl' }} InputLabelProps={{ style: { direction: 'rtl' } }}/>
                <TextField id="password" label="סיסמה" type="search" style={{ margin: '10px' ,width:'100%'}} inputProps={{ dir: 'rtl' }} InputLabelProps={{ style: { direction: 'rtl' } }}/>

                <button type="submit" className="login-button" >התחברות</button>
                <a href="/" className="forgot-password" onClick={handleForgotPassword}>שכחתי סיסמה</a>
            </form>
            
        </div>
        
    );
}

export default Login;
