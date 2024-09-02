import React, {useContext, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import '../CSS/LoginPage.css'; // Uncomment this line after creating the CSS file
import LogoAndText from '../Images/LogoAndText.png';
import TextField from '@mui/material/TextField';
import {UserContext} from "../Auth/Auth.jsx";
import {Typography} from "@mui/material";

const ForgotPassword = () => {
    const [residentId, setResidentId] = useState('')
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        setResidentId(e.target.value)

    }

    // const onSubmit = async()=>{
    //     await
    // }


    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={LogoAndText} alt="Logo" />
            </div>
            <form className="login-form" >
                <Typography>שחזור סיסמה</Typography>
                <TextField
                    id="id"
                    label="תעודת זהות"
                    type="search"
                    style={{ margin: '10px', width: '100%' }}
                    inputProps={{ dir: 'rtl' }}
                    InputLabelProps={{ style: { direction: 'rtl' } }}
                    value={residentId}
                    onChange={handleInputChange}
                />

                <button type="submit" className="login-button">שחזר ססמה</button>
                <a href="/" className="forgot-password" onClick={(e)=>navigate('/login')}>חזרה להתחברות</a>
            </form>
        </div>
    );
}

export default ForgotPassword;
