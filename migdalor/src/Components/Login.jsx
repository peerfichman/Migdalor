import React from 'react'
import Box from '@mui/material/Box';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
// import myImage from "./Image/logo.png";
import myImage from "/public/Image/logo.png";
import backgroundImg from "/public/Image/backgroundImg.jpeg";

const apiUrl = "https://localhost:7149/api/Login/";
// const apiUrl = "https://proj.ruppin.ac.il/bgroup32/test2/tar1/api/Login/";



export default function Login(props) {
    const [formData, setFormData] = useState({
          username: '',
          password: ''
        })

    const navigate = useNavigate();
    
      
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

     
    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(apiUrl+"Login",{
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8' // very important to add the 'charset=UTF-8'!!!!
            })
        })
        .then(res => {
            if (!res.ok) {
                console.log("HTTP error! status: ", res.status);
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json()
        })
        .then(
            (result) => {
                console.log("Successfully logged in!", result);//save the user
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
        <Link onClick={()=>navigate('home')}>שכחתי סיסמה</Link>
        </Box>
    
    </div>
  )
}