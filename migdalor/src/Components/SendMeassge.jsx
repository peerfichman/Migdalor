import React, { useState } from 'react';
import './SendMeassgeStyle.css';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message Sent:', message, 'Scheduled Time:', scheduledTime);
    setShowSuccessMessage(true);
    setShowScheduleModal(false);
    setTimeout(() => setShowSuccessMessage(false), 4000);
  }
  return (
    <div className="form-container">
      <h1 className="form-title">שליחת הודעה</h1>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="button-container">
          <label htmlFor="file-upload" className="form-button">הוספת קובץ</label>
          <input id="file-upload" type="file" className="file-input" />
          <button type="button" className="form-button" onClick={() => setShowScheduleModal(true)}>תזמון</button>
          <button type="submit" className="form-button">שלח</button>
        </div>
        <div className="textarea-wrapper">
          <label htmlFor="message" className="textarea-label">כתיבת הודעה לדיירים:</label>
          <textarea
            id="message"
            className="textarea-container"
            placeholder="ההודעה תשלח לדיירים..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </form>
      {showScheduleModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowScheduleModal(false)}>&times;</span>
            <label htmlFor="schedule">בחר שעה ותאריך:</label>
            <input
              id="schedule"
              type="datetime-local"
              className="form-input"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
            <button type="submit" className="form-button" onClick={handleSubmit}>שלח</button>
          </div>
        </div>
      )}
      {showSuccessMessage && (
        <div className="success-message">ההודעה נשלחה בהצלחה</div>
      )}
    </div>
  );
};

export default SendMessage;
