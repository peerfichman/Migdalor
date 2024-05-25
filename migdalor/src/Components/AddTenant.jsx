import React, { useState } from 'react';
import './styled123.css';

const AddTenant = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    birthDate: '',
    idNumber: '',
    entryDate: '',
    previousCity: '',
    phone: '',
    profession: '',
    relativePhone: '',
    relativeContact: '',
    picture: null,
    hobbies: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
      profession: '',
      relativePhone: '',
      relativeContact: '',
      picture: null,
      hobbies: ''
    });
  };

  return (
    <div className="form-container">
      <h2 className="title">הוספת דייר</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="lastName" className="input" placeholder="שם משפחה" value={formData.lastName} onChange={handleChange} />
          <input type="text" name="firstName" className="input" placeholder="שם פרטי" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="date" name="birthDate" className="input" placeholder="תאריך לידה" value={formData.birthDate} onChange={handleChange} />
          <input type="text" name="idNumber" className="input" placeholder="תעודת זהות" value={formData.idNumber} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="date" name="entryDate" className="input" placeholder="תאריך כניסה לבית" value={formData.entryDate} onChange={handleChange} />
          <input type="text" name="previousCity" className="input" placeholder="עיר מגורים קודמת" value={formData.previousCity} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="phone" className="input" placeholder="טלפון" value={formData.phone} onChange={handleChange} />
          <input type="text" name="profession" className="input" placeholder="מקצוע" value={formData.profession} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="relativePhone" className="input" placeholder="טלפון קרוב משפחה" value={formData.relativePhone} onChange={handleChange} />
          <input type="text" name="relativeContact" className="input" placeholder="איש קשר קרוב משפחה" value={formData.relativeContact} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="file" name="picture" className="input" placeholder="תמונה" onChange={handleChange} />
          <input type="text" name="hobbies" className="input" placeholder="חוגים" value={formData.hobbies} onChange={handleChange} />
        </div>
        <button type="submit" className="button">הוספה</button>
      </form>
      {successMessage && (
        <div className="success-message">
          <div>{successMessage}</div>
          <button onClick={handleSuccessMessageClose} className="button">אישור</button>
        </div>
      )}
    </div>
  );
};

export default AddTenant;
