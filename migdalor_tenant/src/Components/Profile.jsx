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
import * as ResidentRequests from '../Requests/ResidentRequests/ResidentRequests.jsx'
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
    alignItems: 'start',
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
const Profile = () => {
    const [details, setDetails] = useState({

        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        entryDate: '',
        city: '',
        apartmentLocation: '',
        profession: '',
        hobbies: '',
        courses: '',
        aboutMe: '',
    });

    const [showBirthDatePlaceholder, setShowBirthDatePlaceholder] = useState(true);
    const [showEntryDatePlaceholder, setShowEntryDatePlaceholder] = useState(true);
    const [message, setMessage] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const {user} = useContext(UserContext);
    console.log(user)

    useEffect(() => {
        setDetails({
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.dateOfBirth,
            email: user.email,
            entryDate: '',
            city: user.previousAddress,
            apartmentLocation: '',
            profession: user.profession,
            hobbies: '',
            courses: '',
            aboutMe: user.aboutMe,
        })

    }, []);
    const handleChange = (e) => {
        let {name, value} = e.target;
        if (name === 'birthDate') value = moment(value, 'YYYY-MM-DD').format("YYYY-MM-DDT00:00:00")
        setDetails({
            ...details,
            [name]: value
        });
    };


    const handleDateFocus = (name) => {
        if (name === "birthDate") {
            setShowBirthDatePlaceholder(false);
        } else if (name === "entryDate") {
            setShowEntryDatePlaceholder(false);
        }
    };

    const handleDateBlur = (name) => {
        if (name === "birthDate" && !details.birthDate) {
            setShowBirthDatePlaceholder(true);
        } else if (name === "entryDate" && !details.entryDate) {
            setShowEntryDatePlaceholder(true);
        }
    };
    const handekModalClose = ()=>{
        setOpenModal(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await ResidentRequests.EditResidentDetails({
            id: user.id,
            firstName: details.firstName,
            lastName: details.lastName,
            phoneNumber: user.phoneNumber,
            residentId: user.ResidentId,
            dateOfBirth :details.birthDate,
            previousAddress: details.city,
            profession: details.profession,
            email: details.email,
            username: user.username,
            password: user.password,
            currentAddress:details.city
        })
        setMessage("פרטייך נשמר בהצלחה")
        setOpenModal(true);
        // כאן תוסיף את הקוד לשמירת הנתונים על השרת
    };

    return (
        <div><BackButton/>
            <MessageModal message={message} open={openModal} handleClose={handekModalClose}/>
            <StyledBox>
                <Typography variant={"h2"} sx={{margin: 'auto'}}>איזור אישי</Typography>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <StyledLabel>שם פרטי</StyledLabel>
                        <input
                            style={{width: 400, height:25}}
                            type="text"
                            name="firstName"
                            placeholder="שם פרטי"
                            value={details.firstName}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>שם משפחה</StyledLabel>

                        <input
                            type="text"
                            name="lastName"
                            placeholder="שם משפחה"
                            value={details.lastName}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>תאריך לידה</StyledLabel>
                        <input
                            type="text"
                            name="birthDate"
                            placeholder={showBirthDatePlaceholder ? "תאריך לידה" : ""}
                            value={moment(details.birthDate, 'YYYY-MM-DDT00:00:00').format('YYYY-MM-DD')}
                            onChange={handleChange}
                            onFocus={() => handleDateFocus("birthDate")}
                            onBlur={() => handleDateBlur("birthDate")}
                            className="input"
                            onClick={(e) => e.target.type = 'date'}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>אימייל</StyledLabel>

                        <input
                            type="email"
                            name="email"
                            placeholder="איימיל"
                            value={details.email}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>תאריך כניסה לדיור מוגן</StyledLabel>

                        <input
                            type="text"
                            name="entryDate"
                            placeholder={showEntryDatePlaceholder ? "תאריך כניסה לדיור המוגן" : ""}
                            value={details.entryDate}
                            onChange={handleChange}
                            onFocus={() => handleDateFocus("entryDate")}
                            onBlur={() => handleDateBlur("entryDate")}
                            className="input"
                            onClick={(e) => e.target.type = 'date'}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>עיר מגורים</StyledLabel>
                        <input
                            type="text"
                            name="city"
                            placeholder="עיר מגורים"
                            value={details.city}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>מיקום הדירה הנוכחית</StyledLabel>

                        <input
                            type="text"
                            name="apartmentLocation"
                            placeholder="מיקום הדירה הנוכחית"
                            value={details.apartmentLocation}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>מקצוע</StyledLabel>
                        <input
                            type="text"
                            name="profession"
                            placeholder="מקצוע"
                            value={details.profession}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>תחביבים</StyledLabel>

                        <input
                            type="text"
                            name="hobbies"
                            placeholder="תחביבים"
                            value={details.hobbies}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>חוגים בבית</StyledLabel>

                        <input
                            type="text"
                            name="courses"
                            placeholder="חוגים בבית"
                            value={details.courses}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <StyledLabel>בקצרה עלי</StyledLabel>

                        <textarea
                            style={{resize: 'none', width: '43%'}}
                            name="aboutMe"
                            placeholder="בקצרה עלי"
                            value={details.aboutMe}
                            onChange={handleChange}
                        ></textarea>
                    </Row>

                    <Button type={"submit"} color="ochre" sx={{fontWeight:'bold'}} variant="contained">עדכון פרטים</Button>
                </form>
                {/* כאן תוסיף את ה-CARD של הפעילויות */}
            </StyledBox>
        </div>
    );
};

export default Profile;
