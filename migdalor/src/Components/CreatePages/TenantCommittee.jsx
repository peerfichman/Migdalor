import React, {useEffect, useState} from 'react';
import ResidentRequests from '../../Requests/Tenant/index.jsx'
import CommitteeRequests from '../../Requests/Committes/index.jsx'
import './TenantCommittee.css';
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close.js";
import Modal from "@mui/material/Modal";

// const apiUrl = "https://localhost:7149/api/activity/";

const TenantCommittee = ({isEdit, committeeId, setModalOpen, onUpdate}) => {

    const [residents, setResidents] = useState([])

    const [formData, setFormData] = useState({
        residentManager: '',
        committeeName: '',
        responsibilityDescription: ''
    });

    const handleClose = () => setModalOpen(false);


    useEffect(() => {
        if (isEdit) {
            CommitteeRequests.getById(committeeId)
                .then(({committee, residentManager}) => {

                    setFormData({
                        residentManager: residentManager.id,
                        committeeName: committee.committeeName,
                        responsibilityDescription: committee.responsibilityDescription
                    })
                })


        }
    }, []);

    useEffect(() => {
        ResidentRequests.getAll()
            .then(r => setResidents(r))

    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await CommitteeRequests.create(formData);
        onUpdate();
        setModalOpen(false);

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
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="title">ועד דיירים</div>
                        <div className="additional-info-container">
                            <div className="left-container">
                                <input
                                    type="text"
                                    name="committeeName"
                                    placeholder="שם הוועד"
                                    value={formData.committeeName}
                                    onChange={handleChange}
                                    className="input"
                                />

                                <select style={{backgroundColor: "white", color: "black"}}
                                        onChange={handleChange}
                                        name={"residentManager"}
                                        id="residents" required>
                                    {residents.map((r) => {

                                        return (
                                            <option
                                                key={r.id}
                                                value={r.id}
                                            >
                                                {r.firstName + " " + r.lastName}
                                            </option>)
                                    })
                                    }
                                    <option value="" defaultValue>שם האחראי</option>
                                </select>


                            </div>
                            <textarea
                                name="responsibilityDescription"
                                placeholder="תיאור האחריות"
                                value={formData.responsibilityDescription}
                                onChange={handleChange}
                                className="textarea-container"
                            />
                        </div>
                        <button type="submit" className="form-button">שלח</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default TenantCommittee;
