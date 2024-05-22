import React, {useState}from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Icons from './Image/Logo1.png';
import backgroundIMG from './Image/Background.jpg';
import SendMeassge from './SendMeassge';
import OpeningHours from './OpeningHours';
import AddTenant from './AddTenant';


const BackgroundDiv = styled.div`
  background-image: url(${backgroundIMG});
  background-size: cover;
  background-position: center;
  height: 30vh; /* גובה החלק העליון עם התמונה */
  width: 100vw;
`;

const PageContainer = styled.div`
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* נעילת תמונת הרקע במקום כדי שתגלגל עם הדף */
  color: #333;
  font-family: 'Arial', sans-serif;
  height: 100vh; /* Ensure it covers the full height of the viewport */
  width: 100vw; /* Ensure it covers the full width of the viewport */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #38588e; /* צבע רקע כחול */
  color: #fff;
  font-family: 'Arial', sans-serif;
  min-height: 50vh; /* גובה מינימלי לחלק התחתון */
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  
`;








const BurgerButton = styled.div`
  position: fixed;
  right: 1rem;
  top: 2.5rem;
  padding: 1rem;
  cursor: pointer;
  z-index: 2;
  color: #fff;
  background-color: #38588e;
  border-radius: 50%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem; /* גובה ורוחב זהים כדי ליצור עיגול */
  height: 1.5rem; /* גובה ורוחב זהים כדי ליצור עיגול */

  &:hover {
    background-color: #2d4f7d;
  }
`;




const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffd700;
  padding: 0.5rem;
`;



const StyledIcon = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 auto;
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

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.open ? '0' : '-100%')}; /* Show or hide menu */
  width: 250px;
  height: 100%;
  background-color: #38588e; /* Light blue background */
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  transition: right 0.3s ease;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1;
  
`;

const CloseButton = styled.div`
  align-self: flex-start; /* Align to the start (left) */
  cursor: pointer;
  font-size: 1.5rem;
`;

const MenuButton = styled.button`
  background-color: #ffffff;
  color: black;
  padding: 0.5rem; /* Smaller padding for smaller buttons */
  text-align: center;
  border: none;
  border-radius: 8px;
  margin: 0.5rem 0;
  width: 100%;
  cursor: pointer;
  font-size: 0.875rem; /* Slightly smaller font size */

  &:hover {
    background-color: #e0e0e0;
  }
`;

const LogoutButton = styled(MenuButton)`
  background-color: #ff4d4d; /* Red background */
  color: white;

  &:hover {
    background-color: #ff1a1a; /* Darker red on hover */
  }
`;

const Title = styled.h2`
  margin-top: 10px; /* מרווח עליון קטן */
  margin-bottom: 20px; /* ביטול המרווח התחתון */
  
`;


const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null); // <--- מצב לרכיב הפעיל
  const [menuOpen, setMenuOpen] = useState(false); // <--- מצב לתפריט הצד
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // <--- פעולה לפתיחת/סגירת תפריט הצד
  };

  return (
    <>
      <BackgroundDiv />
      
      <PageContainer>

      <BurgerButton onClick={toggleMenu}>☰</BurgerButton>
      
        <StyledIcon src={Icons} alt="icon" />
        <Title>ברוכים הבאים למערכת ניהול הדיור המוגן</Title>
        
        <NavBar>דף הבית</NavBar>
        <ButtonRow>
          <Button onClick={() => setActiveComponent('form')}>שליחת הודעה</Button> 
          <Button onClick={() => setActiveComponent('hours')}>שעות פתיחה</Button>
          <Button onClick={() => setActiveComponent('addTenant')}>הוספת דייר</Button> 
          <Button>יצירת פעילות</Button>
          <Button>כתיבת מודעת אבל</Button>
          <Button>נוהל בוקר טוב</Button>
          <Button>ועד דיירים</Button>
          <Button>עדכון פרטי מחלקה</Button>
        </ButtonRow>
        <div>
          {activeComponent === 'form' && <SendMeassge />} 
          {activeComponent === 'hours' && <OpeningHours />} 
          {activeComponent === 'addTenant' && <AddTenant />} 
        </div>
        <SideMenu open={menuOpen}>
          <CloseButton onClick={toggleMenu}>×</CloseButton>
          <MenuButton onClick={() => setActiveComponent('form')}>שליחת הודעה</MenuButton> 
          <MenuButton onClick={() => setActiveComponent('hours')}>שעות פתיחה</MenuButton>
          <MenuButton onClick={() => setActiveComponent('addTenant')}>הוספת דייר</MenuButton> 
          <MenuButton>יצירת פעילות</MenuButton>
          <MenuButton>כתיבת מודעת אבל</MenuButton>
          <MenuButton>נוהל בוקר טוב</MenuButton>
          <MenuButton>ועד דיירים</MenuButton>
          <MenuButton>עדכון פרטי מחלקה</MenuButton>
          <LogoutButton>התנתקות</LogoutButton>
        </SideMenu>
      </PageContainer>
    </>
  );
};

export default Home;
















