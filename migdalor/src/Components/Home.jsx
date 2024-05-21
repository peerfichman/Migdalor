import React, {useState}from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Icons from './Image/Logo1.png';
import SendMeassge from './SendMeassge';
import OpeningHours from './OpeningHours';



const PageContainer = styled.div`
background-color: #f0e6d2;
background-size: cover;
color: #333;
font-family: 'Arial', sans-serif;
height: 90vh;
width: 90vw;
margin: 0;
padding: 0;
box-sizing: border-box;
`;






const BurgerButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 1rem;
  cursor: pointer;
`;


const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffd700;
  padding: 0.5rem;
`;



const Icon = styled.img`
    margin-right: 0.5rem;
`;

const ButtonRow = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr); /* 3 columns with equal width */
gap: 10px; /* gap between buttons */
margin-top: 1rem;
padding: 0 10px; /* padding for the row */
`;

const Button = styled.button`
background-color: #f0f0f0; /* Light grey background */
padding: 1rem;
text-align: center;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
font-size: 1rem;
font-weight: bold;
color: #333;
cursor: pointer;
transition: background-color 0.3s;

&:hover {
  background-color: #e0e0e0; /* Slightly darker grey on hover */
}
`;


const Home = () => {
    
    const [activeComponent, setActiveComponent] = useState(null);

    
  
  return (
    <PageContainer>
        
         <BurgerButton>☰</BurgerButton>

         <div className='Icon'>
         <Icon src={Icons} alt='icon' style={{ width: '100px', height: '100px' }} />
         </div>
         
      <NavBar>
        
        דף הבית
      </NavBar>
      <ButtonRow>
    

    <Button onClick={() => setActiveComponent('form')}>שליחת הודעה</Button>
    <Button onClick={() => setActiveComponent('hours')}>שעות פתיחה</Button>
    

        <Button>הוספת דייר</Button>
        <Button>יצירת פעילות</Button>
        <Button>כתיבת מודעת אבל</Button>
        <Button>נוהל בוקר טוב</Button>
        <Button> ועד דיירים</Button>
        
        <Button>עדכון פרטי מחלקה</Button>
        
      </ButtonRow>
      <div>
      {activeComponent === 'form' && <SendMeassge />}
      {activeComponent === 'hours' && <OpeningHours />}
      
      </div>
      
    </PageContainer>

    
  );
  
};

export default Home;
















