import React, { useState } from 'react';
import '../CSS/Profile.css';

const Profile = () => {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    entryDate: '',
    city: '',
    apartmentLocation: '',
    profession: '',
    hobbies: '',
    courses: '',
    aboutMe: '',
    image: null
  });

  const [showBirthDatePlaceholder, setShowBirthDatePlaceholder] = useState(true);
  const [showEntryDatePlaceholder, setShowEntryDatePlaceholder] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    setDetails({
      ...details,
      image: e.target.files[0]
    });
  };

  const handleDateFocus = (name) => {
    if (name === "birthDate") {
      setShowBirthDatePlaceholder(false);
    } else if (name === "entryDate") {
      setShowEntryDatePlaceholder(false);
    }
  };

  const handleDateBlur = (name) => {
    if (name === "birthDate" && !details.birthDate) {
      setShowBirthDatePlaceholder(true);
    } else if (name === "entryDate" && !details.entryDate) {
      setShowEntryDatePlaceholder(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן תוסיף את הקוד לשמירת הנתונים על השרת
    console.log(details);
  };

  return (
    <div className="personal-area">
      <h2>איזור אישי</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="שם פרטי"
          value={details.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="שם משפחה"
          value={details.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="birthDate"
          placeholder={showBirthDatePlaceholder ? "תאריך לידה" : ""}
          value={details.birthDate}
          onChange={handleChange}
          onFocus={() => handleDateFocus("birthDate")}
          onBlur={() => handleDateBlur("birthDate")}
          className="input"
          onClick={(e) => e.target.type = 'date'}
        />
        <input
          type="email"
          name="email"
          placeholder="איימיל"
          value={details.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="entryDate"
          placeholder={showEntryDatePlaceholder ? "תאריך כניסה לדיור המוגן" : ""}
          value={details.entryDate}
          onChange={handleChange}
          onFocus={() => handleDateFocus("entryDate")}
          onBlur={() => handleDateBlur("entryDate")}
          className="input"
          onClick={(e) => e.target.type = 'date'}
        />
        <input
          type="text"
          name="city"
          placeholder="עיר מגורים"
          value={details.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apartmentLocation"
          placeholder="מיקום הדירה הנוכחית"
          value={details.apartmentLocation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="profession"
          placeholder="מקצוע"
          value={details.profession}
          onChange={handleChange}
        />
        <input
          type="text"
          name="hobbies"
          placeholder="תחביבים"
          value={details.hobbies}
          onChange={handleChange}
        />
        <input
          type="text"
          name="courses"
          placeholder="חוגים בבית"
          value={details.courses}
          onChange={handleChange}
        />
        <textarea
          name="aboutMe"
          placeholder="בקצרה עלי"
          value={details.aboutMe}
          onChange={handleChange}
        ></textarea>
        <label className="upload-label">
          העלאת תמונה אישית
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            className="upload-button"
          />
        </label>
        <button type="submit" className="submit-button">עדכון פרטים</button>
      </form>
      {/* כאן תוסיף את ה-CARD של הפעילויות */}
    </div>
  );
};

export default Profile;
