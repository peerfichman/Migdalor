

import React from 'react';
import Logo from "../Images/Logo.png";
import {useNavigate} from "react-router-dom";



const Header = ()=> {

    const navigate =useNavigate();
const onClick = (e) => {
    navigate('/')
}

    return(
        <header style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }} >
            <button onClick={onClick } style={{all:'unset', outline:'revert', paddingRight:19}} >
            <img src={Logo} alt="Logo" className="menu-logo" style={{width: 175, height:175}} />
            </button>
        </header>

    )
}

export default Header;