import React, {useContext, useEffect, useState} from 'react';
import '../CSS/Profile.css';
import {styled} from "@mui/system";
import theme from "../Theme/Theme.jsx";
import {Button, Typography} from "@mui/material";
import BackButton from "./BackButton.jsx";
import {useTheme} from "@mui/material/styles";
import {UserContext} from "../Auth/Auth.jsx";
import moment from "moment";
import MessageModal from "./MessageModal.jsx";
import * as InitiativeRequests from '../Requests/Initatives/InitativesRequests.jsx'
import Box from "@mui/material/Box";

const StyledLabel = styled('Typography')({
    color: 'white',
    fontWeight: 'bold',

})

const StyledBox = styled('Box')({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    width: '50%',
    height: '75%',
    borderRadius: 20

});
const Row = styled('Box')({
    width: '100%',
    marginRight: '5rem',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
})
const CreateInitiative = () => {
    const [details, setDetails] = useState({

        initiativeName: '',
        location: '',
        date: ' ',
        startHour: '',
        endHour: '',
        initiativeType: '',
        invitationDescription: '',
        maxParticipants: 0,
        residentNumber: 0
    });

    const [showDatePlaceholder, setShowDatePlaceholder] = useState(true);
    const [showTimePlaceholder, setShowTimePlaceholder] = useState(true);
    const [message, setMessage] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const {user} = useContext(UserContext);


    const handleChange = (e) => {
        let {name, value} = e.target;
        if (name === 'birthDate') value = moment(value, 'YYYY-MM-DD').format("YYYY-MM-DDT00:00:00")
        if (name === 'startHour' || name === 'endHour') value = moment(value, 'hh:mm').format("hh:mm:00")
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
        if (name === "date") {
            setShowDatePlaceholder(false);
        }

    };

    const handleDateBlur = (name) => {
        if (name === "birthDate" && !details.birthDate) {
            setShowDatePlaceholder(true);
        }
    };
    const handekModalClose = () => {
        setOpenModal(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {initiativeNumber} = await InitiativeRequests.CreatInitiative({
            ...details,
            initiativeType: '', residentNumber: user.id
        })
        console.log(initiativeNumber)
        await InitiativeRequests.JoinInitiative(initiativeNumber, user.id);
        setMessage("יוזמה פורסמה בהצלחה")
        setOpenModal(true);
        // כאן תוסיף את הקוד לשמירת הנתונים על השרת
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
        <div><BackButton/>
            <MessageModal message={message} open={openModal} handleClose={handekModalClose}/>
            <StyledBox>
                <Typography variant={"h2"} sx={{margin: 'auto'}}>יצירת יוזמה</Typography>
                <form onSubmit={handleSubmit} style={{
                    marginTop: 20,
                    width: "90%",
                    height: "100%"
                }}>
                    <Row>
                        <StyledLabel>שם היוזמה</StyledLabel>
                        <input
                            type="text"
                            name="initiativeName"
                            placeholder="שם היוזמה"
                            value={details.initiativeName}
                            onChange={handleChange}
                            className="input"
                            style={{
                                width: '50%'
                            }}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>מיקום</StyledLabel>

                        <input
                            type="text"
                            name="location"
                            placeholder="מיקום"
                            value={details.location}
                            onChange={handleChange}
                            style={{
                                width: '50%'
                            }}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>תאריך</StyledLabel>
                        <input
                            type="text"
                            name="date"
                            placeholder={showDatePlaceholder ? "תאריך" : ""}
                            value={moment(details.date, 'YYYY-MM-DDT00:00:00').format('YYYY-MM-DD')}
                            onChange={handleChange}
                            onFocus={() => handleDateFocus("date")}
                            onBlur={() => handleDateBlur("date")}
                            className="input"
                            onClick={(e) => e.target.type = 'date'}
                            style={{
                                width: '50%'
                            }}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>שעת התחלה</StyledLabel>

                        <input
                            type="time"
                            name="startHour"
                            placeholder={showTimePlaceholder ? "שעת התחלה" : ""}
                            value={details.startHour === 'Invalid date' ? '' : moment(details.startHour, 'HH:mm:ss').format('HH:mm')}
                            onChange={handleChange}
                            onFocus={handleTimeFocus}
                            onBlur={handleTimeBlur}
                            className="input"
                            style={{
                                width: '50%'
                            }}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>שעת סיום</StyledLabel>

                        <input
                            type="time"
                            name="endHour"
                            placeholder={showTimePlaceholder ? "שעת התחלה" : ""}
                            value={details.endHour === 'Invalid date' ? '' : moment(details.endHour, 'HH:mm:ss').format('HH:mm')}
                            onChange={handleChange}
                            onFocus={handleTimeFocus}
                            onBlur={handleTimeBlur}
                            className="input"
                            style={{
                                width: '50%'
                            }}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>הגבלת משתתפים</StyledLabel>
                        <input
                            type="number"
                            name="maxParticipants"
                            placeholder="הגבלת משתתפים"
                            value={details.maxParticipants}
                            onChange={handleChange}
                            className="input"
                            min="0"
                            disabled
                            style={{
                                width: '50%'
                            }}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>תיאור נוסף</StyledLabel>

                        <textarea
                            style={{resize: 'none', width: '43%'}}
                            name="invitationDescription"
                            placeholder="תיאור נוסף"
                            value={details.invitationDescription}
                            onChange={handleChange}
                            style={{
                                width: '50%',
                                height: 75
                            }}
                        ></textarea>
                    </Row>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', height: 100, alignItems: 'center'}}>
                        <Button sx={{height: 35}} type={"submit"} color="ochre" variant="contained">שמור
                            שינויים</Button>
                        <Button sx={{height: 35}} onClick={handleDelete} color="error" variant="contained">מחק
                            יוזמה</Button>
                        <Button sx={{height: 35}} type={"submit"} color="ochre" variant="contained">שמירת
                            היוזמה</Button>

                    </Box>

                </form>
                {/* כאן תוסיף את ה-CARD של הפעילויות */}
            </StyledBox>
        </div>
    );
};

export default CreateInitiative;
