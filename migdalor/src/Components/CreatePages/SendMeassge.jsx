import React, {useEffect, useState} from 'react';
import './SendMeassgeStyle.css';
import * as announcementsRequests from "../../Requests/Announcements/announcementsRequests.jsx";
import moment from "moment/moment.js";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';

const SendMessage = ({isEdit, messageNumber, setModalOpen}) => {

    const [message, setMessage] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (isEdit) {
            announcementsRequests.getAnnouncementById(messageNumber)
                .then((message) => {
                    setMessage(message.content);
                })

        }
    }, []);
    const handleClose = () => setModalOpen(false);
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (isEdit) {
            await announcementsRequests.editAnnouncement({id: messageNumber, content: message});
        } else {
            announcementsRequests.createAnnouncement({content: message}).then((response) => {
                if (!(response.status === 200)) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            });
        }
        setModalOpen(false)
    }


    return (
        <div>
            <Modal
                open={true}
                sx={{
                    top: '20%',
                    right: '20%'
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="form-container">
                    <Button sx={{alignSelf: 'start'}}>
                        <CloseIcon
                            onClick={handleClose}/>
                    </Button>
                    <h1 className="form-title">שליחת הודעה</h1>
                    <form onSubmit={handleSubmit} className="form-layout">
                        <div className="button-container">
                            <label htmlFor="file-upload" className="form-button">הוספת קובץ</label>
                            <input id="file-upload" type="file" className="file-input"/>
                            <button type="button" className="form-button"
                                    onClick={() => setShowScheduleModal(true)}>תזמון
                            </button>
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
            </Modal>
        </div>
    );
};

export default SendMessage;
