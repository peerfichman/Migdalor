import React, { useState } from 'react';

const AddObituaryNotice = () => {
    const [formData, setFormData] = useState({
        name: '',
        dateOfDeath: '',
        cemetery: '',
        location: '',
        description: ''
      });
      const [showDatePlaceholder, setShowDatePlaceholder] = useState(true);
      const [dateError, setDateError] = useState('');

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleDateFocus = () => {
        setShowDatePlaceholder(false);
      };
    
      const handleDateBlur = (e) => {
        if (!e.target.value) {
          setShowDatePlaceholder(true);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

        // Check if dateOfDeath is in the future
        if (formData.dateOfDeath > today) {
            setDateError('תאריך הפטירה לא יכול להיות בתאריך עתידי');
            return;
        } else {
            setDateError('');
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
          <div className="title">כתיבת מודעת אבל</div>
          <div className="additional-info-container">
            <div className="left-container">
              <input
                type="text"
                name="name"
                placeholder="שם הנפטר"
                value={formData.name}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="dateOfDeath"
                placeholder={showDatePlaceholder ? "תאריך פטירה" : ""}
                value={formData.dateOfDeath}
                onChange={handleChange}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                className="input"
                onClick={(e) => e.target.type = 'date'}
              />
              <input
                type="text"
                name="cemetery"
                placeholder="בית עלמין"
                value={formData.cemetery}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="location"
                placeholder="מיקום השבעה"
                value={formData.location}
                onChange={handleChange}
                className="input"
              />
            </div>
            <textarea
              name="description"
              placeholder="תיאור נוסף"
              value={formData.description}
              onChange={handleChange}
              className="textarea-container"
            />
          </div>
          {dateError && <div className="error-message">{dateError}</div>}
          <button type="submit" className="form-button">שליחה</button>
        </form>
      );
    };

export default AddObituaryNotice;