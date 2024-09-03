import React, {useEffect, useState} from 'react';
import obituaryRequests from "../../Requests/Obituary/index.jsx";
import moment from 'moment';
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

const AddObituaryNotice = ({isEdit, obituaryNumber, setModalOpen , onUpdate}) => {
    const [formData, setFormData] = useState({
        deceasedName: '',
        residentId: '',
        date: '',
        cemeteryName: '',
        description: '',
        shivaAddress: ''
    });
    const [showDatePlaceholder, setShowDatePlaceholder] = useState(true);
    const [dateError, setDateError] = useState('');

    useEffect(() => {
        if (isEdit) {
            obituaryRequests.getById(obituaryNumber)
                .then((obituary) => {
                    setFormData({
                        ...obituary
                    })
                })

        }
    }, []);
    const handleChange = (e) => {
        let {name, value} = e.target;
        if (name === 'date') value = moment(value, 'yyyy-MM-DD').format('yyyy-MM-DDT00:00:00')
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClose = () => setModalOpen(false);
    const handleDateFocus = () => {
        setShowDatePlaceholder(false);
    };

    const handleDateBlur = (e) => {
        if (!e.target.value) {
            setShowDatePlaceholder(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await obituaryRequests.edit({obituaryNumber, ...formData});
        } else {
            obituaryRequests.create(formData).then((response) => {
                if (!(response.status === 200)) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            });
        }
        onUpdate();
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
                <form className="form-container" onSubmit={handleSubmit}>
                    <Button sx={{alignSelf: 'start'}}>
                        <CloseIcon
                            onClick={handleClose}/>
                    </Button>
                    <div className="title">כתיבת מודעת אבל</div>
                    <div className="additional-info-container">
                        <div className="left-container">
                            <input
                                type="text"
                                name="deceasedName"
                                placeholder="שם הנפטר"
                                value={formData.deceasedName}
                                onChange={handleChange}
                                className="input"
                            />
                            <input
                                type="text"
                                name="residentId"
                                placeholder="ת.ז. הנפטר"
                                value={formData.residentId}
                                onChange={handleChange}
                                className="input"
                            />

                            <input
                                type="text"
                                name="date"
                                placeholder={showDatePlaceholder ? "תאריך פטירה" : ""}
                                value={moment(formData.date, 'yyyy-MM-DDT00:00:00').format('yyyy-MM-DD')}
                                onChange={handleChange}
                                onFocus={handleDateFocus}
                                onBlur={handleDateBlur}
                                className="input"
                                onClick={(e) => e.target.type = 'date'}
                            />
                            <input
                                type="text"
                                name="cemeteryName"
                                placeholder="בית עלמין"
                                value={formData.cemeteryName}
                                onChange={handleChange}
                                className="input"
                            />
                            <input
                                type="text"
                                name="shivaAddress"
                                placeholder="מיקום השבעה"
                                value={formData.shivaAddress}
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
                    {dateError && <div className="error-message">{dateError}</div>}
                    <button type="submit" className="form-button">שליחה</button>
                </form>
            </Modal>
        </div>
    );
};

export default AddObituaryNotice;