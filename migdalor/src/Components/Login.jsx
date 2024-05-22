import React from 'react'
import Box from '@mui/material/Box';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import myImage from "./Image/logo.png";
import backgroundImg from "./Image/backgroundImg.jpeg";

const apiUrl = "https://localhost:7149/api/Login/Login"; 

export default function Login(props) {
    const [formData, setFormData] = useState({
          username: '',
          password: ''
        })

    const navigate = useNavigate();
      
    const [errors, setErrors] = useState({})
    const regexUsername = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;':",./<>?\\]+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{7,12}$/;


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("Successfully Logged in!", result);
        } catch (error) {
            console.error("Error during POST:", error);
        }
    }
    
    
  return (
    <div style={{ backgroundImage: backgroundImg }}>
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
        {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        <br/>
        <TextField
        name='password'
         onChange={handleChange}
         required
          label="סיסמה"
          type="password"
          size="small"
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>} 
        <br/>

        <Button type="submit" variant="contained" color="primary"><b>התחברות</b></Button>
        <br/>
        <Link>שכחתי סיסמה</Link>
        </Box>
    
    </div>
  )
}