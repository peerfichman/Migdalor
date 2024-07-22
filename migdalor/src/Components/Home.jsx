import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Icons from '/public/Image/Logo1.png';
import SendMeassge from './SendMeassge';
import OpeningHours from './OpeningHours';
import AddTenant from './AddTenant';
import CreateActivity from './CreateActivity'; // Import the new component
import './HomeStyle.css';
import GoodMorningPolicy from './GoodMorningPolicy';


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
      <div className="background-div" />
      <div className="page-container">
        {!menuOpen && (
          <div className="burger-button" onClick={toggleMenu}>☰</div>
        )}
        <img className="styled-icon" src={Icons} alt="icon" />
        <nav className="nav-bar">ברוכים הבאים למערכת ניהול הדיור המוגן</nav>
        
        <div className="button-row">
          <button className="button" onClick={() => handleClick('form')}>שליחת הודעה</button>
          <button className="button" onClick={() => handleClick('hours')}>שעות פתיחה</button>
          <button className="button" onClick={() => handleClick('addTenant')}>הוספת דייר</button>
          <button className="button" onClick={() => handleClick('createActivity')}>יצירת פעילות</button>
          <button className="button">כתיבת מודעת אבל</button>
          <button className="button" onClick={() => handleClick('goodMorningPolicy')}>נוהל בוקר טוב</button>
          <button className="button">ועד דיירים</button>
          <button className="button">עדכון פרטי מחלקה</button>
        </div>
        <div className="content-container" ref={contentRef}>
          {activeComponent === 'form' && <SendMeassge />}
          {activeComponent === 'hours' && <OpeningHours />}
          {activeComponent === 'addTenant' && <AddTenant />}
          {activeComponent === 'createActivity' && <CreateActivity />} {/* Render the new component */}
          {activeComponent === 'goodMorningPolicy' && <GoodMorningPolicy />}
        </div>
        <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
          <div className="close-button" onClick={toggleMenu}>×</div>
          <button className="menu-button" onClick={() => handleClick('form')}>שליחת הודעה</button>
          <button className="menu-button" onClick={() => handleClick('hours')}>שעות פתיחה</button>
          <button className="menu-button" onClick={() => handleClick('addTenant')}>הוספת דייר</button>
          <button className="menu-button" onClick={() => handleClick('createActivity')}>יצירת פעילות</button>
          <button className="menu-button">כתיבת מודעת אבל</button>
          <button className="menu-button" onClick={() => handleClick('goodMorningPolicy')}>נוהל בוקר טוב</button>
          <button className="menu-button">ועד דיירים</button>
          <button className="menu-button">עדכון פרטי מחלקה</button>
          <button className="logout-button">התנתקות</button>
        </div>
      </div>
    </>
  );
};

export default Home;
