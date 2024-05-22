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
      
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8' // very important to add the 'charset=UTF-8'!!!!
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json()
        })
        .then(
            (result) => {
                console.log("Successfully logged in!", result);
                navigate('/home'); // navigate to the home page
            },
            (error) => {
                console.log("Error during POST:", error);
            }
        );
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