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
    LastName: '',
    FirstName: '',
    DateOfBirth: '',
    Id: '',
    EntryDate: '',
    PreviousAddress: '',
    Phone: '',
    AdditionalPhone: '',
    Email: '',
    AdditionalEmail: '',
    Profession: '',
    //RelativePhone: '',
    //RelativeContact: '',
    ResidentImage: null,
    //TblResidentHasHobbies : []
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
        : [...prevData.TblResidentHasHobbies, hobby].slice(0, 10); // Limit to 10 hobbies
      return { ...prevData, TblResidentHasHobbies };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = generateRandomPassword();
    const username = formData.Id;
    setUserDetails({ username, password });
    setSuccessMessage(`הדייר ${formData.firstName} ${formData.lastName} נוסף בהצלחה`);
    console.log(formData);

    debugger;

    fetch(apiUrl+"AddResident", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',//מה אני שולח
          'Accept': 'application/json; charset=UTF-8'//מה אני מקבל
          // very important to add the 'charset=UTF-8'!!!!
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
        // navigate('/home'); // navigate to the home page (make sure to use useNavigate hook if you're using react-router)
      },
      (error) => {
        console.log("Error during POST:", error);
      }
    );
  };

  const handleSuccessMessageClose = () => {
    setSuccessMessage('');
    setFormData({
      lastName: '',
      firstName: '',
      DateOfBirth: '',
      Id: '',
      entryDate: '',
      previousCity: '',
      phone: '',
      additionalPhone: '',
      email: '',
      additionalEmail: '',
      Profession: '',
      relativePhone: '',
      relativeContact: '',
      ResidentImage: null,
      TblResidentHasHobbies : []
    });
    setUserDetails({ username: '', password: '' });
  };

  return (
    <div className="form-container">
      <h2 className="title">הוספת דייר</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="firstName" className="input" placeholder="שם פרטי" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" className="input" placeholder="שם משפחה" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="Id" className="input" placeholder="תעודת זהות" value={formData.Id} onChange={handleChange} />
          <input type="text" name="DateOfBirth" className="input" placeholder="תאריך לידה" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} value={formData.DateOfBirth} onChange={handleChange} />
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
          <input type="text" name="Profession" className="input" placeholder="מקצוע" value={formData.Profession} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="relativePhone" className="input" placeholder="טלפון קרוב משפחה" value={formData.relativePhone} onChange={handleChange} />
          <input type="text" name="relativeContact" className="input" placeholder="איש קשר קרוב משפחה" value={formData.relativeContact} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="file" name="ResidentImage" className="input" placeholder="תמונה" onChange={handleChange} />
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
          {/* {formData.TblResidentHasHobbies.map((hobby, index) => (
            <div key={index} className="hobby-item">
              <input type="checkbox" checked readOnly />
              <label>{hobby}</label>
            </div>
          ))} */}
        </div>
        <button type="submit" className="form-button">הוספה</button>
      </form>
      {userDetails.username && userDetails.password && (
        <div className="user-details-modal">
          {successMessage && (
            <div className="success-message">
              <div>{successMessage}</div>
            </div>
          )}
          <div className="user-details">
            <div className="detail-row">
              <label>שם משתמש:</label>
              <input type="text" name="username" className="input" value={userDetails.username} readOnly />
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
