import React, { useState } from 'react';

const UpdateDepartmentDetails = () => {
    const [formData, setFormData] = useState({
        departmentName: '',
        departmentManager: '',
        managerPhoneNumber: '',
        departmentDays: '',
        departmentHours: '',
        departmentDescription: ''
      });
      const [errors, setErrors] = useState({
        phoneNumberError: ''
      });

      const validatePhoneNumber = (phoneNumber) => {
        // Regular expression for validating exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (!validatePhoneNumber(formData.managerPhoneNumber)) {
          setErrors({ phoneNumberError: 'מספר הטלפון חייב להיות בדיוק 10 ספרות' });
          return;
      } else {
          setErrors({ phoneNumberError: '' });
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
          <div className="title">עדכון פרטי מחלקה</div>
          <div className="additional-info-container">
            <div className="left-container">
              <input
                type="text"
                name="departmentName"
                placeholder="שם המחלקה"
                value={formData.departmentName}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="departmentManager"
                placeholder="שם מנהל המחלקה"
                value={formData.departmentManager}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="managerPhoneNumber"
                placeholder="מספר טלפון של מנהל המחלקה"
                value={formData.managerPhoneNumber}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="departmentDays"
                placeholder="ימי פעילות"
                value={formData.departmentDays}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="departmentHours"
                placeholder="שעות פעילות"
                value={formData.departmentHours}
                onChange={handleChange}
                className="input"
              />
            </div>
            <textarea
              name="departmentDescription"
              placeholder="תיאור נוסף"
              value={formData.departmentDescription}
              onChange={handleChange}
              className="textarea-container"
            />
          </div>
          {errors.phoneNumberError && <div className="error-message">{errors.phoneNumberError}</div>}
          <button type="submit" className="form-button">עדכון</button>
        </form>
      );
    };

export default UpdateDepartmentDetails;