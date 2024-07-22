import React, { useState } from 'react';
import './TenantCommittee.css';

// const apiUrl = "https://localhost:7149/api/activity/";

const TenantCommittee = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    date: '',
    hours: '',
    participantLimit: '',
    interests: '',
    description: ''
  });

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
   
      setTimeout(() => {
        const success = Math.random() < 0.5; 
        if (success) {
          setFileStatus({ success: true, message: 'קובץ עלה בהצלחה' });
        } else {
          setFileStatus({ success: false, message: 'שגיאה בהעלאת הקובץ' });
        }
      }, 1000); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (file) {
      console.log(file);
    }
    //שליחת מידע לשרת
//     fetch((apiUrl + "AddActivity", {) {
//       method: 'POST',
//       body: formData
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setFileStatus({ success: true, message: 'קובץ עלה בהצלחה' });
//         console.log('Upload successful:', data);
//       })
//       .catch(error => {
//         setFileStatus({ success: false, message: 'שגיאה בהעלאת הקובץ' });
//         console.error('Upload error:', error);
//       });
//   }
// };
  };


  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="title">ועד דיירים</div>
      <div className="additional-info-container">
        <div className="left-container">
          <input
            type="text"
            name="activityName"
            placeholder="שם האחראי"
            value={formData.activityName}
            onChange={handleChange}
            className="input"
          />
          <input
            type="number"
            name="participantLimit"
            placeholder="שם האחראי"
            value={formData.participantLimit}
            onChange={handleChange}
            className="input"
            min="1"
          />
          <input
            type="text"
            name="interests"
            placeholder="טלפון"
            value={formData.interests}
            onChange={handleChange}
            className="input"
          />
          <input
          type="text"
          name="interests"
          placeholder="דרך פעולה"
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
        </div>
        <textarea
          name="description"
          placeholder="תיאור האחריות"
          value={formData.description}
          onChange={handleChange}
          className="textarea-container"
        />
      </div>
      <button type="submit" className="form-button">שלח</button>
    </form>
  );
};

export default TenantCommittee;
