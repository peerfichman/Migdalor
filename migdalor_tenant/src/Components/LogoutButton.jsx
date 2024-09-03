import React, {useContext} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {UserContext} from "../Auth/Auth.jsx";

const LogoutButton = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const{logout} = useContext(UserContext);

    const onClick = () =>{
        logout();
    }

    return(
        <IconButton sx={{
            position: 'absolute',
            height: 60,
            width: 60,
            top: "3%",
            right:"3%",
            backgroundColor: "#d50000",
            border: '3px solid white',
        }} onClick={onClick}>
            <LogoutIcon sx={{
                color: "error",
                stroke : theme.palette.primary.main


            }} />
        </IconButton>
    )
}

export default LogoutButton