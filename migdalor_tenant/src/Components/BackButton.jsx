import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const BackButton = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const onClick = () =>{
        navigate('/');
    }

    return(
        <IconButton sx={{
            position: 'absolute',
            height: 50,
            width: 50,
            top: "3%",
            left:"3%",
            backgroundColor: theme.palette.secondary.main,
            border: '3px solid white',
        }} onClick={onClick}>
            <ArrowBackIcon sx={{
                color: theme.palette.primary.main,
                stroke : theme.palette.primary.main


            }} />
        </IconButton>
    )
}

export default BackButton