import React from 'react'
import Box from '@mui/material/Box';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import myImage from "../logo.png";
import backgroundImg from "../backgroundImg.jpeg";

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

    const handleSubmit = (e) => {
        if (formData.username === "admin" && formData.password === 'ad12343211ad') {//חיבור לפטצ במקום הקוד הקיים
            console.log("Successfully Loged as Admin!");
            //navigate('/systemadmin');
            sessionStorage.setItem('loggedInUser', JSON.stringify({username:"admin"}));
        }
        else e.preventDefault()
                const validationErrors = {}
            //מעבר על הלוקאל סטורג וחיפוש אחר השם משתמש
            let usernameInList = props.sendUsers.find(
                user => user.username === formData.username
            );

            if(!formData.username.trim()) {
                validationErrors.username = "Username is required"
            }
            else if (formData.username.length > 60 || !regexUsername.test(formData.username)) {
                validationErrors.username = "Invalid Username"
            }
            //אם לא קיים במערך המתשמשים משתמש עם השם הזה, תחזור שגיאה
            else if (!usernameInList) {
                validationErrors.username = "Username not found, Please Register"
            }
            else{
                console.log(usernameInList.username);
            }
        


            let passwordInList = props.sendUsers.find(
                user => user.username === formData.username && user.password === formData.password
            );

            if(!formData.password.trim()) {
                validationErrors.password = "Password is required"
            } else if(formData.password.length < 7 || formData.password.length > 12 || !regexPassword.test(formData.password)){
                validationErrors.password = "Invalid Password"
            }
            //אם הסיסמה לא תואמת את השם משתמש, תחזור שגיאה
            else if (!passwordInList) {
                validationErrors.password = "Password is incorrect"
            }
            else{
                console.log(usernameInList.password);
            }

            setErrors(validationErrors)
        

            if(Object.keys(validationErrors).length === 0) {
                console.log("Successfully Loged!");
                props.sendUserToApp(usernameInList);
                let user = props.sendUsers.find(
                u => u.username === formData.username && u.password === formData.password
                );
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                navigate('/profile',{state:user});
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
          size="small"npm install react-router-dom
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