import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import departmentRequests from "../../Requests/Department/index.jsx";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const CreateDepartment = ({isEdit, departmentNumber, setModalOpen, onUpdate}) => {
    const [formData, setFormData] = useState({
        departmentName: '',
        departmentManager: '',
        managerPhoneNumber: '',
        departmentDays: '',
        departmentHours: '',
        description: ''
    });
    const [errors, setErrors] = useState({
        phoneNumberError: ''
    });

    const validatePhoneNumber = (phoneNumber) => {
        // Regular expression for validating exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };
    const handleClose = () => setModalOpen(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEdit) {
            await departmentRequests.edit({id: departmentNumber, ...formData});
        } else {
            departmentRequests.create(formData).then((response) => {
                if (!(response.status === 200)) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            });
        }
        onUpdate()
        setModalOpen(false)
    }

    useEffect(() => {
        if (isEdit) {
            departmentRequests.getById(departmentNumber)
                .then((department) => {
                    setFormData({
                        ...department
                    })
                })

        }
    }, []);

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
                    <div className="title">{isEdit ? "עדכון פרטי מחלקה" : "צור מחלקה"}</div>

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
                            name="description"
                            placeholder="תיאור נוסף"
                            value={formData.description}
                            onChange={handleChange}
                            className="textarea-container"
                        />
                    </div>
                    {errors.phoneNumberError && <div className="error-message">{errors.phoneNumberError}</div>}
                    <button type="submit" className="form-button">שליחה</button>
                </form>
            </Modal>
        </div>
    );
};

export default CreateDepartment;