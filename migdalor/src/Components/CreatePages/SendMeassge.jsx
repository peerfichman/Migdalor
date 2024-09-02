import React, {useEffect, useState} from 'react';
import './SendMeassgeStyle.css';
import * as announcementsRequests from "../../Requests/Announcements/announcementsRequests.jsx";
import moment from "moment/moment.js";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';

const SendMessage = ({isEdit, messageNumber, setModalOpen}) => {

    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (isEdit) {
            announcementsRequests.getAnnouncementById(messageNumber)
                .then((message) => {
                    setMessage(message.content);
                    setSubject(message.subject);
                })

        }
    }, []);
    const handleClose = () => setModalOpen(false);
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (isEdit) {
            await announcementsRequests.editAnnouncement({id: messageNumber, content: message, subject:subject});
        } else {
            const date =  new Date;
            console.log("msg:", {content: message,  subject:subject ,date: date.toISOString()})
            announcementsRequests.createAnnouncement({content: message,  subject:subject ,date: date.toISOString()}).then((response) => {
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

                        <div className="textarea-wrapper">
                            <label htmlFor="message" className="textarea-label" style={{color:"black"}}>נושא:</label>
                            <input
                                id="text"
                                type="text"
                                style={{display:"block", backgroundColor:"white", color:"black"}}
                                placeholder="ההודעה תשלח לדיירים..."
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <label htmlFor="message" className="textarea-label" style={{color:"black"}}>כתיבת הודעה לדיירים:</label>
                            <textarea
                                id="message"
                                className="textarea-container"
                                placeholder="ההודעה תשלח לדיירים..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div className="button-container">
                            <input id="file-upload" type="file" className="file-input"/>

                            <button type="submit" className="form-button">שלח</button>
                        </div>
                    </form>
                    {showSuccessMessage && (
                        <div className="success-message">ההודעה נשלחה בהצלחה</div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default SendMessage;
