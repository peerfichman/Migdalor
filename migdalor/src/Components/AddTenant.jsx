import React, { useState } from 'react';
import './AddTenantStyle.css';


const generateRandomPassword = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  let password = '';
  for (let i = 0; i < 3; i++) {
    password += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 3; i++) {
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return password;
};

const AddTenant = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    birthDate: '',
    idNumber: '',
    entryDate: '',
    previousCity: '',
    phone: '',
    additionalPhone: '',
    email: '',
    additionalEmail: '',
    profession: '',
    relativePhone: '',
    relativeContact: '',
    picture: null,
    selectedHobbies: []
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleHobbyChange = (e) => {
    const hobby = e.target.value;
    setFormData((prevData) => {
      const selectedHobbies = prevData.selectedHobbies.includes(hobby)
        ? prevData.selectedHobbies.filter((h) => h !== hobby)
        : [...prevData.selectedHobbies, hobby].slice(0, 10); // Limit to 10 hobbies
      return { ...prevData, selectedHobbies };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = generateRandomPassword();
    const username = formData.idNumber;
    setUserDetails({ username, password });
    setSuccessMessage(`הדייר ${formData.firstName} ${formData.lastName} נוסף בהצלחה`);
  };

  const handleSuccessMessageClose = () => {
    setSuccessMessage('');
    setFormData({
      lastName: '',
      firstName: '',
      birthDate: '',
      idNumber: '',
      entryDate: '',
      previousCity: '',
      phone: '',
      additionalPhone: '',
      email: '',
      additionalEmail: '',
      profession: '',
      relativePhone: '',
      relativeContact: '',
      picture: null,
      selectedHobbies: []
    });
    setUserDetails({ username: '', password: '' });
  };

  const handleUserDetailsClose = () => {
    setUserDetails({ username: '', password: '' });
  };

  const hobbiesList = [
    "קריאה", "כתיבה", "ציור", "בישול", "אפייה", "טיפוח גינה", "ספורט", "ריצה", "שחייה",
    "רכיבה על אופניים", "טיולים בטבע", "דיג", "נגרות", "סרגיה", "משחקי קופסה", "שחמט",
    "פאזלים", "יוגה", "מדיטציה", "צילום", "מוזיקה", "נגינה", "שירה", "איסוף בולים",
    "איסוף מטבעות", "איסוף כרטיסים", "צפייה בסרטים", "ביקור במוזיאונים", "תיאטרון", "ריקוד"
  ];

  return (
    <div className="form-container">
      <h2 className="title">הוספת דייר</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="firstName" className="input" placeholder="שם פרטי" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" className="input" placeholder="שם משפחה" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="idNumber" className="input" placeholder="תעודת זהות" value={formData.idNumber} onChange={handleChange} />
          <input type="text" name="birthDate" className="input" placeholder="תאריך לידה" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} value={formData.birthDate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="previousCity" className="input" placeholder="עיר מגורים קודמת" value={formData.previousCity} onChange={handleChange} />
          <input type="text" name="entryDate" className="input" placeholder="תאריך כניסה לבית" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} value={formData.entryDate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="phone" className="input" placeholder="טלפון" value={formData.phone} onChange={handleChange} />
          <input type="text" name="additionalPhone" className="input" placeholder="טלפון נוסף" value={formData.additionalPhone} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="email" name="email" className="input" placeholder="אימייל" value={formData.email} onChange={handleChange} />
          <input type="text" name="profession" className="input" placeholder="מקצוע" value={formData.profession} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="relativePhone" className="input" placeholder="טלפון קרוב משפחה" value={formData.relativePhone} onChange={handleChange} />
          <input type="text" name="relativeContact" className="input" placeholder="איש קשר קרוב משפחה" value={formData.relativeContact} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="file" name="picture" className="input" placeholder="תמונה" onChange={handleChange} />
        </div>
        <div className="form-row">
          <select name="hobbies" className="input hobby-select" onChange={handleHobbyChange}>
            <option value="">בחר תחביב</option>
            {hobbiesList.map((hobby, index) => (
              <option key={index} value={hobby}>{hobby}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <span className="hobby-note">*ניתן להוסיף עד 10 תחביבים שונים</span>
        </div>
        <div className="form-row hobbies-container">
          {formData.selectedHobbies.map((hobby, index) => (
            <div key={index} className="hobby-item">
              <input type="checkbox" checked readOnly />
              <label>{hobby}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="form-button">הוספה</button>
      </form>
      {userDetails.username && userDetails.password && (
        <div className="user-details-modal">
          <div className="success-message">
          <div>{successMessage}</div>
        </div>
          <div className="user-details">
            
            <div className="detail-row">
              <label>שם משתמש:</label>
              <input type="text" name="username" className="input" value={userDetails.username} readOnly  />
            </div>
            <div className="detail-row">
              <label>סיסמא:</label>
              <input type="text" name="password" className="input" value={userDetails.password} readOnly />
            </div>
            <button onClick={handleSuccessMessageClose} className="form-button">אישור</button>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default AddTenant;
