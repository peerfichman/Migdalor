import React, {useEffect, useState} from 'react';
import './AddTenantStyle.css';
import Modal from "@mui/material/Modal";
import tenantRequests from '../../Requests/Tenant/index.jsx'
import * as activityRequests from "../../Requests/Activity/activitiesRequests.jsx";
import moment from "moment";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";


// const hobbiesList = [
//   "קריאה", "כתיבה", "ציור", "בישול", "אפייה", "טיפוח גינה", "ספורט", "ריצה", "שחייה",
//   "רכיבה על אופניים", "טיולים בטבע", "דיג", "נגרות", "סרגיה", "משחקי קופסה", "שחמט",
//   "פאזלים", "יוגה", "מדיטציה", "צילום", "מוזיקה", "נגינה", "שירה", "איסוף בולים",
//   "איסוף מטבעות", "איסוף כרטיסים", "צפייה בסרטים", "ביקור במוזיאונים", "תיאטרון", "ריקוד"
// ];

const generateUUID = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

console.log(generateUUID());

// const generateRandomPassword = () => {
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//   const numbers = '0123456789';
//   let password = '';
//   for (let i = 0; i < 3; i++) {
//     password += letters.charAt(Math.floor(Math.random() * letters.length));
//   }
//   for (let i = 0; i < 3; i++) {
//     password += numbers.charAt(Math.floor(Math.random() * numbers.length));
//   }
//   return password;
// };//guid

const AddTenant = ({isEdit, tenantId, setModalOpen, onUpdate}) => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        ResidentId: '',
        DateOfBirth: '',
        PreviousAddress: '',
        Profession: '',
        Email: '',
        Username: '',
        Password: '',

    });

    const [successMessage, setSuccessMessage] = useState('');
    const [userDetails, setUserDetails] = useState({username: '', password: ''});

    const handleClose = () => setModalOpen(false);

    const handleChange = (e) => {
        let {name, value, files} = e.target;
        if (name === 'DateOfBirth') value = moment(value, 'yyyy-MM-DD').format('yyyy-MM-DDT00:00:00')
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };
    // פונקציה זו מעדכנת את המצב של formData כאשר המשתמש משנה את ערכים בטופס.

    // const handleHobbyChange = (e) => {
    //   const hobby = e.target.value;
    //   setFormData((prevData) => {
    //     const TblResidentHasHobbies = prevData.TblResidentHasHobbies.includes(hobby)
    //       ? prevData.TblResidentHasHobbies.filter((h) => h !== hobby)
    //       : [...prevData.TblResidentHasHobbies, hobby].slice(0, 10);
    //   });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await tenantRequests.edit({id: tenantId, ...formData});
            setModalOpen(false);
        } else {const password = generateUUID();
            const username = formData.ResidentId;
            setUserDetails({username, password});
            setSuccessMessage(`הדייר ${formData.FirstName} ${formData.LastName} נוסף בהצלחה `);
            console.log(formData)
            tenantRequests.create({...formData, Username: username, Password: password}).then( (response) => {
                if (!(response.status === 200)) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            });
        }
        onUpdate();
         setModalOpen(false);
    };

    useEffect(() => {
        if (isEdit) {
            tenantRequests.getById(tenantId)
                .then((tenant) => {
                    setFormData({
                        FirstName: tenant.firstName,
                        LastName: tenant.lastName,
                        PhoneNumber: tenant.phoneNumber,
                        ResidentId: tenant.residentId,
                        DateOfBirth: moment(tenant.dateOfBirth, 'yyyy-MM-DDT00:00:00').format('yyyy-MM-DD'),
                        PreviousAddress: tenant.previousAddress,
                        Profession: tenant.proffession,
                        Email: tenant.email,
                        Username: tenant.username,
                        Password: tenant.password,

                    })
                })

        }
    }, []);

    const handleSuccessMessageClose = () => {
        setSuccessMessage('');
        setFormData({
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            residentId: '',
            DateOfBirth: '',
            PreviousAddress: '',
            Profession: '',
            Email: '',
            Username: '',
            Password: '',

        });
        setUserDetails({username: '', password: ''});
        setModalOpen(false)
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
                <div className="add-tenant-form-container">
                    <Button sx={{alignSelf: 'start'}}>
                        <CloseIcon
                            onClick={handleClose}/>
                    </Button>
                    <h2 className="add-tenant-title">הוספת דייר חדש</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="add-tenant-form-row">
                            <input type="text" name="FirstName" className="add-tenant-input" placeholder="שם פרטי"
                                   value={formData.FirstName} onChange={handleChange}/>
                            <input type="text" name="LastName" className="add-tenant-input" placeholder="שם משפחה"
                                   value={formData.LastName} onChange={handleChange}/>
                        </div>
                        <div className="add-tenant-form-row">
                            <input type="text" name="ResidentId" className="add-tenant-input" placeholder="תעודת זהות"
                                   value={formData.ResidentId} onChange={handleChange}/>
                            <input type="text" name="DateOfBirth" className="add-tenant-input" placeholder="תאריך לידה"
                                   onFocus={(e) => e.target.type = 'date'} value={moment(formData.DateOfBirth, 'yyyy-MM-DDT00:00:00').format('yyyy-MM-DD')}
                                   onChange={handleChange}/>
                        </div>
                        <div className="add-tenant-form-row">
                            <input type="text" name="PreviousAddress" className="add-tenant-input"
                                   placeholder="עיר מגורים קודמת" value={formData.PreviousAddress}
                                   onChange={handleChange}/>
                            <input type="email" name="Email" className="add-tenant-input" placeholder="אימייל"
                                   value={formData.Email} onChange={handleChange}/>
                        </div>
                        <div className="add-tenant-form-row">
                            <input type="text" name="PhoneNumber" className="add-tenant-input" placeholder="טלפון"
                                   value={formData.PhoneNumber} onChange={handleChange}/>
                            <input type="text" name="Profession" className="add-tenant-input" placeholder="מקצוע"
                                   value={formData.Profession} onChange={handleChange}/>

                        </div>
                        <button type="submit" className="add-tenant-form-button">הוספה</button>
                    </form>
                    {userDetails.username && userDetails.password && (
                        <div className="add-tenant-user-details-modal">
                            {successMessage && (
                                <div className="add-tenant-success-message">
                                    <div>{successMessage}</div>
                                </div>
                            )}
                            <div className="add-tenant-user-details">
                                <div className="add-tenant-detail-row">
                                    <label>שם משתמש:</label>
                                    <input type="text" name="username" className="add-tenant-input"
                                           value={userDetails.username} readOnly/>
                                </div>
                                <div className="add-tenant-detail-row">
                                    <label>סיסמא:</label>
                                    <input type="text" name="password" className="add-tenant-input"
                                           value={userDetails.password} readOnly/>
                                </div>

                                <button onClick={handleSuccessMessageClose} className="add-tenant-form-button">אישור
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default AddTenant;
