import React, { useState } from 'react';
import './AddTenantStyle.css';

const apiUrl = "https://localhost:7149/api/Resident/";

const hobbiesList = [
  "קריאה", "כתיבה", "ציור", "בישול", "אפייה", "טיפוח גינה", "ספורט", "ריצה", "שחייה",
  "רכיבה על אופניים", "טיולים בטבע", "דיג", "נגרות", "סרגיה", "משחקי קופסה", "שחמט",
  "פאזלים", "יוגה", "מדיטציה", "צילום", "מוזיקה", "נגינה", "שירה", "איסוף בולים",
  "איסוף מטבעות", "איסוף כרטיסים", "צפייה בסרטים", "ביקור במוזיאונים", "תיאטרון", "ריקוד"
];

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
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Id: '',
    DateOfBirth: '',
    PreviousAddress: '',
    CurrentAddress: '',
    ResidentImage: '',
    Profession: '',
    Email: '',
    Username: '',
    Password: '',
    
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleHobbyChange = (e) => {
    const hobby = e.target.value;
    setFormData((prevData) => {
      const TblResidentHasHobbies = prevData.TblResidentHasHobbies.includes(hobby)
        ? prevData.TblResidentHasHobbies.filter((h) => h !== hobby)
        : [...prevData.TblResidentHasHobbies, hobby].slice(0, 10); 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = generateRandomPassword();
    const username = formData.Id;
    setUserDetails({ username, password });
    setSuccessMessage(`הדייר ${formData.FirstName} ${formData.LastName} נוסף בהצלחה`);

    const dataToSend = { ...formData, Username: username, Password: password };

    console.log("Data to be sent:", dataToSend); // Logging the data to be sent

    fetch(apiUrl + "AddResident", {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("Resident added!", result);
        },
        (error) => {
          console.log("Error during POST:", error);
        }
      );
  };

  const handleSuccessMessageClose = () => {
    setSuccessMessage('');
    setFormData({
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      Id: '',
      DateOfBirth: '',
      PreviousAddress: '',
      CurrentAddress: '',
      ResidentImage: '',
      Profession: '',
      Email: '',
      Username: '',
      Password: '',
      
    });
    setUserDetails({ username: '', password: '' });
  };

  return (
    <div className="add-tenant-form-container">
      <h2 className="add-tenant-title">הוספת דייר חדש</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-tenant-form-row">
          <input type="text" name="FirstName" className="add-tenant-input" placeholder="שם פרטי" value={formData.FirstName} onChange={handleChange} />
          <input type="text" name="LastName" className="add-tenant-input" placeholder="שם משפחה" value={formData.LastName} onChange={handleChange} />
        </div>
        <div className="add-tenant-form-row">
          <input type="text" name="Id" className="add-tenant-input" placeholder="תעודת זהות" value={formData.Id} onChange={handleChange} />
          <input type="text" name="DateOfBirth" className="add-tenant-input" placeholder="תאריך לידה" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} value={formData.DateOfBirth} onChange={handleChange} />
        </div>
        <div className="add-tenant-form-row">
          <input type="text" name="PreviousAddress" className="add-tenant-input" placeholder="עיר מגורים קודמת" value={formData.PreviousAddress} onChange={handleChange} />
          {/* <input type="text" name="EntryDate" className="add-tenant-input" placeholder="תאריך כניסה לבית" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} value={formData.EntryDate} onChange={handleChange} /> */}
        </div>
        <div className="add-tenant-form-row">
          <input type="text" name="PhoneNumber" className="add-tenant-input" placeholder="טלפון" value={formData.PhoneNumber} onChange={handleChange} />
          {/* <input type="text" name="AdditionalPhone" className="add-tenant-input" placeholder="טלפון נוסף" value={formData.AdditionalPhone} onChange={handleChange} />  */}
        </div>
        <div className="add-tenant-form-row">
          <input type="email" name="Email" className="add-tenant-input" placeholder="אימייל" value={formData.Email} onChange={handleChange} />
          <input type="text" name="Profession" className="add-tenant-input" placeholder="מקצוע" value={formData.Profession} onChange={handleChange} />
        </div>
        <div className="add-tenant-form-row">
          {/* <input type="text" name="RelativePhone" className="add-tenant-input" placeholder="טלפון קרוב משפחה" value={formData.RelativePhone} onChange={handleChange} />
          <input type="text" name="RelativeContact" className="add-tenant-input" placeholder="איש קשר קרוב משפחה" value={formData.RelativeContact} onChange={handleChange} /> */}
        </div>
        <div className="add-tenant-form-row">
          <input type="file" name="ResidentImage" className="add-tenant-input" placeholder="תמונה" onChange={handleChange} />
          <div>
          <span className="add-tenant-hobby-note">*הוספת תמונת הדייר</span>
          </div>
        </div>
        <div className="add-tenant-form-row">
          <select name="hobbies" className="add-tenant-input add-tenant-hobby-select" onChange={handleHobbyChange}>
            <option value="">בחר תחביב</option>
            {hobbiesList.map((hobby, index) => (
              <option key={index} value={hobby}>{hobby}</option>
            ))}
          </select>
        </div>
        <div className="add-tenant-form-row">
          <span className="add-tenant-hobby-note">*ניתן להוסיף עד 10 תחביבים שונים</span>
        </div>
        {/* <div className="add-tenant-form-row add-tenant-hobbies-container">
          {formData.TblResidentHasHobbies.map((hobby, index) => (
            <div key={index} className="add-tenant-hobby-item">
              <input type="checkbox" checked onChange={() => handleHobbyChange({ target: { value: hobby } })} />
              <label>{hobby}</label>
            </div>
          ))}
        </div> */}
        <button type="submit" className="add-tenant-form-button">הוספה</button>
      </form>
      {userDetails.username && userDetails.password && (
        <div className="add-tenant-user-details-modal">
          {successMessage && (
            <div className="add-tenant-success-message">
              <div>{successMessage}</div>
            </div>
          )}
          <div className="add-tenant-user-details">
            <div className="add-tenant-detail-row">
              <label>שם משתמש:</label>
              <input type="text" name="username" className="add-tenant-input" value={userDetails.username} readOnly />
            </div>
            <div className="add-tenant-detail-row">
              <label>סיסמא:</label>
              <input type="text" name="password" className="add-tenant-input" value={userDetails.password} readOnly />
            </div>
            <button onClick={handleSuccessMessageClose} className="add-tenant-form-button">אישור</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTenant;
