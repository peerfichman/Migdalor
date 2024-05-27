import React, { useState } from 'react';
import './CreateActivityStyle.css';

const CreateActivity = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    date: '',
    hours: '',
    participantLimit: '',
    interests: '',
    description: ''
  });

  const [file, setFile] = useState(null);
  const [fileStatus, setFileStatus] = useState(null); // New state for file upload status
  const [showDatePlaceholder, setShowDatePlaceholder] = useState(true);
  const [showTimePlaceholder, setShowTimePlaceholder] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Simulate file upload success/failure
      setTimeout(() => {
        const success = Math.random() > 0.5; // Randomly decide if upload is successful
        if (success) {
          setFileStatus({ success: true, message: 'קובץ עלה בהצלחה' });
        } else {
          setFileStatus({ success: false, message: 'שגיאה בהעלאת הקובץ' });
        }
      }, 1000); // Simulate an upload delay
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (file) {
      console.log(file);
    }
  };

  const handleDateFocus = () => {
    setShowDatePlaceholder(false);
  };

  const handleDateBlur = (e) => {
    if (!e.target.value) {
      setShowDatePlaceholder(true);
    }
  };

  const handleTimeFocus = (e) => {
    e.target.type = 'time';
    setShowTimePlaceholder(false);
  };

  const handleTimeBlur = (e) => {
    if (!e.target.value) {
      e.target.type = 'text';
      setShowTimePlaceholder(true);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="title">יצירת פעילות</div>
      <div className="additional-info-container">
        <div className="left-container">
          <input
            type="text"
            name="activityName"
            placeholder="שם הפעילות"
            value={formData.activityName}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="date"
            placeholder={showDatePlaceholder ? "תאריך" : ""}
            value={formData.date}
            onChange={handleChange}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            className="input"
            onClick={(e) => e.target.type = 'date'}
          />
          <input
            type="text"
            name="hours"
            placeholder={showTimePlaceholder ? "שעת פעילות" : ""}
            value={formData.hours}
            onChange={handleChange}
            onFocus={handleTimeFocus}
            onBlur={handleTimeBlur}
            className="input"
          />
          <input
            type="number"
            name="participantLimit"
            placeholder="הגבלת משתתפים"
            value={formData.participantLimit}
            onChange={handleChange}
            className="input"
            min="0"
          />
          <input
            type="text"
            name="interests"
            placeholder="תחומי עניין"
            value={formData.interests}
            onChange={handleChange}
            className="input"
          />
          <label className="file-label">
            הוסף קובץ
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
          {fileStatus && (
            <div className={fileStatus.success ? 'success-message' : 'error-message'}>
              {fileStatus.message}
            </div>
          )}
        </div>
        <textarea
          name="description"
          placeholder="תיאור נוסף"
          value={formData.description}
          onChange={handleChange}
          className="textarea-container"
        />
      </div>
      <button type="submit" className="form-button">שלח</button>
    </form>
  );
};

export default CreateActivity;
