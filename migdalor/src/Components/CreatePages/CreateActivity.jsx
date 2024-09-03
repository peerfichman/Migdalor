import React, {useEffect, useState} from 'react';
import * as activityRequests from '../../Requests/Activity/activitiesRequests.jsx'
import Modal from '@mui/material/Modal';
import './CreateActivityStyle.css';
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

// eslint-disable-next-line react/prop-types
const CreateActivity = ({isEdit, activityNumber, setModalOpen, onUpdate}) => {

    const [formData, setFormData] = useState({
        Date: '',
        ActivityName: '',
        Time: '',
        MaxParticipants: '',
        Description: '',
        Interests: ''
    });


    const [showDatePlaceholder, setShowDatePlaceholder] = useState(true);
    const [showTimePlaceholder, setShowTimePlaceholder] = useState(true);


    useEffect(() => {
        if (isEdit) {
            activityRequests.getActivityById(activityNumber)
                .then((activity) => {
                    setFormData({
                        ActivityName: activity.activityName,
                        Date: moment(activity.date, 'yyyy-MM-DD').format('yyyy-MM-DDT00:00:00'),
                        Description: activity.description.split('T')[0],
                        MaxParticipants: activity.maxParticipants,
                        Time: moment(activity.time, 'HH:mm').format('HH:mm:ss'),
                        Interests: activity.interests

                    })
                })

        }
    }, []);
    const handleClose = () => setModalOpen(false);

    const handleChange = (e) => {
        let {name, value} = e.target;
        if (name === 'Time') value = moment(value, 'HH:mm').format('HH:mm:ss');
        if (name === 'Date') value = moment(value, 'yyyy-MM-DD').format('yyyy-MM-DDT00:00:00')
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEdit) {
            await activityRequests.editActivity({id: activityNumber, ...formData});
        } else {
            activityRequests.createActivity(formData).then( (response) => {
                if (!(response.status === 200)) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            });
        }
        onUpdate();
        setModalOpen(false)
    }


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
                <form className="form-container" onSubmit={handleSubmit}>
                    <Button sx={{alignSelf: 'start'}}>
                        <CloseIcon
                            onClick={handleClose}/>
                    </Button>
                    <div className="title">{isEdit ? 'עריכת פעילות' : 'יצירת פעילות'}</div>
                    <div className="additional-info-container">
                        <div className="left-container">
                            <input
                                type="text"
                                name="ActivityName"
                                placeholder="שם הפעילות"
                                value={formData.ActivityName}
                                onChange={handleChange}
                                className="input"
                            />
                            <input
                                type="date"
                                name="Date"
                                placeholder={showDatePlaceholder ? "תאריך" : ""}
                                value={moment(formData.Date, 'yyyy-MM-DDT00:00:00').format('yyyy-MM-DD')}
                                onChange={handleChange}
                                onFocus={handleDateFocus}
                                onBlur={handleDateBlur}
                                className="input"
                                onClick={(e) => e.target.type = 'date'}
                            />
                            <input
                                type="time"
                                name="Time"
                                placeholder={showTimePlaceholder ? "שעת פעילות" : ""}
                                value={formData.Time === 'Invalid date'? '' : moment(formData.Time, 'HH:mm:ss').format('HH:mm')}
                                onChange={handleChange}
                                onFocus={handleTimeFocus}
                                onBlur={handleTimeBlur}
                                className="input"
                            />
                            <input
                                type="number"
                                name="MaxParticipants"
                                placeholder="הגבלת משתתפים"
                                value={formData.MaxParticipants}
                                onChange={handleChange}
                                className="input"
                                min="0"
                            />
                            <input
                                type="text"
                                name="Interests"
                                placeholder="תחומי עניין"
                                value={formData.Interests}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <textarea
                            name="Description"
                            placeholder="תיאור נוסף"
                            value={formData.Description}
                            onChange={handleChange}
                            className="textarea-container"
                        />
                    </div>
                    <button type="submit" className="form-button">שלח</button>
                </form>
            </Modal>
        </div>
    );
};

export default CreateActivity;




