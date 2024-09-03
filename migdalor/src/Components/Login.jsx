import React, {useContext} from 'react'
import Box from '@mui/material/Box';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
// import myImage from "./Image/logo.png";
import myImage from "/public/Image/logo.png";
import backgroundImg from "/public/Image/backgroundImg.jpeg";
import {UserContext} from "../Auth/Auth.jsx";

const apiUrl = "https://localhost:7149/api/Login/";
// const apiUrl = "https://proj.ruppin.ac.il/bgroup32/test2/tar1/api/Login/";



export default function Login(props) {
    const [formData, setFormData] = useState({
          username: '',
          password: ''
        })

    const navigate = useNavigate();

    const {login} = useContext(UserContext);
    
      
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

     
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData.username, formData.password)
        navigate('/home')
    }
    
    
  return (
    <div style={{ backgroundImage: backgroundImg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
    <img src={myImage} alt="react logo" />
   

    <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      >
        <TextField
         name='username'
         onChange={handleChange}
         required
          label="שם משתמש"
          type="text"
          size="small"
        />
        
        <br/>
        <TextField
        name='password'
         onChange={handleChange}
         required
          label="סיסמה"
          type="password"
          size="small"
        />
        
        <br/>

        <Button type="submit" variant="contained" color="primary"><b>התחברות</b></Button>
        <br/>
        </Box>
    
    </div>
  )
}