import React, {useContext, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import '../CSS/LoginPage.css'; // Uncomment this line after creating the CSS file
import LogoAndText from '../Images/LogoAndText.png';
import TextField from '@mui/material/TextField';
import {UserContext} from "../Auth/Auth.jsx";
import {Typography} from "@mui/material";
import * as ResidentRequests from '../Requests/ResidentRequests/ResidentRequests.jsx'
import Message from '../Components/MessageModal.jsx'
const ForgotPassword = () => {
    const [residentId, setResidentId] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        setResidentId(e.target.value)

    }
    const closeMessage =()=>{
        setMessage('');
    }

    const onSubmit = async(e)=>{
        e.preventDefault();
        const response = await ResidentRequests.ForgotPassword(residentId);
        if(response.status!==200) setMessage(`משתמש  לא נמצא `)
        else setMessage("פרטי ההתחברות נשלחו לכתובת המייל של הדייר")
    }


    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={LogoAndText} alt="Logo" />
            </div>
            <form className="login-form">
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

                <button  className="login-button" onClick={onSubmit}>שחזר סיסמה</button>
                <a href="/" className="forgot-password" onClick={(e)=> {
                    e.preventDefault();
                    navigate('/login')
                }}>חזרה להתחברות</a>
            </form>
            <Message message={message} open={message!== ''} handleClose={closeMessage} />
        </div>
    );
}

export default ForgotPassword;
