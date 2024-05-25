import React, { useState, useEffect, useRef } from 'react';
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
  height: 30vh;
  width: 100vw;
`;

const PageContainer = styled.div`
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F6F2E4;
  color: #fff;
  margin-left:
  
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
  width: 100%;
  padding: 20px;
  background-color: #38588e;
  margin-top: 2rem;
`;

const BurgerButton = styled.div`
  position: fixed;
  right: 1rem;
  top: 0.7rem;
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
  width: 1rem;
  height: 1rem;

  &:hover {
    background-color: #2d4f7d;
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #bea029;
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
 
`;

const StyledIcon = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 auto;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 1rem;
  padding: 0 10px;
`;

const Button = styled.button`
  background-color: #f0f0f0;
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
    background-color: #e0e0e0;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.open ? '0' : '-100%')};
  width: 250px;
  height: 100%;
  background-color: #38588e;
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
  align-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  color: #fff;
`;

const MenuButton = styled.button`
  background-color: #ffffff;
  color: black;
  padding: 0.5rem;
  text-align: center;
  border: none;
  border-radius: 8px;
  margin: 0.5rem 0;
  width: 100%;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const LogoutButton = styled(MenuButton)`
  background-color: #ff4d4d;
  color: white;

  &:hover {
    background-color: #ff1a1a;
  }
`;


const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (component) => {
    setActiveComponent(component);
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <>
      <BackgroundDiv />
      <PageContainer>
        
        <BurgerButton onClick={toggleMenu}>☰</BurgerButton>
        <StyledIcon src={Icons} alt="icon" />
        <NavBar>ברוכים הבאים למערכת ניהול הדיור המוגן</NavBar>
        
        <ButtonRow>
          <Button onClick={() => handleClick('form')}>שליחת הודעה</Button>
          <Button onClick={() => handleClick('hours')}>שעות פתיחה</Button>
          <Button onClick={() => handleClick('addTenant')}>הוספת דייר</Button>
          <Button>יצירת פעילות</Button>
          <Button>כתיבת מודעת אבל</Button>
          <Button>נוהל בוקר טוב</Button>
          <Button>ועד דיירים</Button>
          <Button>עדכון פרטי מחלקה</Button>
        </ButtonRow>
        <ContentContainer ref={contentRef}>
          {activeComponent === 'form' && <SendMeassge />}
          {activeComponent === 'hours' && <OpeningHours />}
          {activeComponent === 'addTenant' && <AddTenant />}
        </ContentContainer>
        <SideMenu open={menuOpen}>
          <CloseButton onClick={toggleMenu}>×</CloseButton>
          <MenuButton onClick={() => handleClick('form')}>שליחת הודעה</MenuButton>
          <MenuButton onClick={() => handleClick('hours')}>שעות פתיחה</MenuButton>
          <MenuButton onClick={() => handleClick('addTenant')}>הוספת דייר</MenuButton>
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
