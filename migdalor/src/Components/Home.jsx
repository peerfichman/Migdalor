import React, {useState, useRef, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Icons from '/public/Image/Logo1.png';
import SendMeassge from './CreatePages/SendMeassge.jsx';
import OpeningHours from './OpeningHours';
import AddTenant from './CreatePages/AddTenant.jsx';
import './HomeStyle.css';
import GoodMorningPolicy from './GoodMorningPolicy';
import AddObituaryNotice from './CreatePages/AddObituaryNotice.jsx';
import TenantCommittee from './CreatePages/TenantCommittee.jsx';
import Entities from "./EntityPage/Entities.jsx";
import {UserContext} from "../Auth/Auth.jsx";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef(null);

  const {logout} =useContext(UserContext)
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
          <button className="button" onClick={() => handleClick('form')}>הודעות</button>
          <button className="button" onClick={() => handleClick('hours')}>שעות פעילות</button>
          <button className="button" onClick={() => handleClick('addTenant')}>הוספת דייר</button>
          <button className="button" onClick={() => handleClick('activities')}>פעילויות</button>
          <button className="button" onClick={() => handleClick('addObituaryNotice')}>מודעות אבל</button>
          <button className="button" onClick={() => handleClick('goodMorningPolicy')}>נוהל בוקר טוב</button>
          <button className="button" onClick={() => handleClick('tenantCommittee')}>ועד דיירים</button>
          <button className="button" onClick={() => handleClick('updateDepartmentDetails')}>מחלקות</button>
        </div>
        <div className="content-container" ref={contentRef}>
          {activeComponent === 'form' && <Entities EntityName={'Message'}/>}
          {activeComponent === 'hours' && <OpeningHours />}
          {activeComponent === 'addTenant' && <Entities EntityName={'Tenant'}/>}
          {activeComponent === 'activities' && <Entities EntityName={'Activity'}/>} {/* Render the new component */}
          {activeComponent === 'goodMorningPolicy' && <GoodMorningPolicy />}
          {activeComponent === 'updateDepartmentDetails' && <Entities EntityName={'Department'}/>}
          {activeComponent === 'addObituaryNotice' && <Entities  EntityName={"Obituary"}/>}
          {activeComponent === 'tenantCommittee' && <Entities EntityName={"Committee"}/>}

        </div>
        <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
          <div className="close-button" onClick={toggleMenu}>×</div>
          <button className="menu-button" onClick={() => handleClick('form')}>שליחת הודעה</button>
          <button className="menu-button" onClick={() => handleClick('hours')}>שעות פעילות</button>
          <button className="menu-button" onClick={() => handleClick('addTenant')}>הוספת דייר</button>
          <button className="menu-button" onClick={() => handleClick('activities')}>יצירת פעילות</button>
          <button className="menu-button" onClick={() => handleClick('addObituaryNotice')}>כתיבת מודעת אבל</button>
          <button className="menu-button" onClick={() => handleClick('goodMorningPolicy')}>נוהל בוקר טוב</button>
          <button className="menu-button" onClick={() => handleClick('tenantCommittee')}>ועד דיירים</button>
          <button className="menu-button" onClick={() => handleClick('updateDepartmentDetails')}>עדכון פרטי מחלקה</button>
          <button className="logout-button" onClick={(e)=>logout()}>התנתקות</button>
        </div>
      </div>
    </>
  );
};

export default Home;
