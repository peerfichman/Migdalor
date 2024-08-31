import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {useContext, useEffect, useState} from "react";
import * as InitiativeRequests from '../../Requests/Initatives/InitativesRequests.jsx'
import MessageModal from "../MessageModal.jsx";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";
import moment from "moment";
import {UserContext} from "../../Auth/Auth.jsx";


const Row = styled('Box')({
    marginBottom: 10,
})
const InitiativeModal = ({isParticipating, initiativeNumber, open, onClose, onInitiativeJoined}) => {

    const {user} = useContext(UserContext);

    const theme = useTheme()

    const [initiative, setInitiative] = useState({});
    const [message, setMessage] = useState('');
    const [isAvailable , setIsAvailable] = useState(true)
    // const handleClose = () => setOpen();

    const handelJoinActivity = async () => {
        await ActivitiesRequests.JoinActivity(initiativeNumber, user.id);
        await onActivityJoined();
        setMessage('הצטרפת בהצלחה לפעילות')
    }
    const handelRemoveFromActivity = async () => {
        await ActivitiesRequests.RemoveFromActivity(initiativeNumber, user.id);
        await onActivityJoined();
        setMessage('הוסרת בהצלחה מהפעילות')
    }
    const handleOpenCloseModal = () => {
        setMessage('')
    }

    useEffect(() => {
        ActivitiesRequests.GetParticiapntsInActivity(initiativeNumber)
            .then(particapnts => setIsAvailable( particapnts.length < initiative.maxParticipants))
    }, [initiative]);


    useEffect(() => {
        ActivitiesRequests.GetActivityById(initiativeNumber)
            .then(act => {
                setInitiative(act)
            })
    }, [initiativeNumber])
    console.log("isAvailable?", isAvailable)
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-Typographyledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    height: "80%",
                    width: "80%",
                    backgroundColor: '#F6F2E4',
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Button sx={{
                    alignSelf: 'start',
                    marginTop: '3%', marginRight: "3%"
                }}>
                    <CloseIcon
                        onClick={onClose}/>
                </Button>
                <Typography variant={"h2"} sx={{color: 'black', alignSelf: 'center'}}>פרטי הפעילות</Typography>
                <Box
                    sx={{
                        marginRight: '10%',
                        marginTop: '5%'
                    }}>

                    <Row>
                        <Typography variant={"h5"}>שם הפעילות:</Typography>
                        <Typography>{initiative?.activityName}</Typography>
                    </Row>
                    <Row>

                        <Typography variant={"h5"}>תאריך:</Typography>
                        <Typography>{moment(initiative?.date).format("DD/MM/YYYY")}</Typography>
                    </Row>

                    <Row>

                        <Typography variant={"h5"}>שעת התחלה:</Typography>
                        <Typography>{moment(initiative?.time, "HH:mm:ss").format("HH:mm")}</Typography>
                    </Row>

                    <Row>

                        <Typography variant={"h5"}>מס' משתתפים מקסימלי:</Typography>
                        <Typography>{initiative?.maxParticipants}</Typography>
                    </Row>

                    <Row>

                        <Typography variant={"h5"}>תיאור נוסף:</Typography>
                        <Typography>{initiative?.description}</Typography>
                    </Row>
                </Box>

                {isParticipating ?
                    <Button sx={{alignSelf: 'center',width:'50%'}}
                            color="error"  variant="contained" size="medium" onClick={handelRemoveFromActivity}> בטל השתתפות </Button>
                    :
                    <Button disabled ={!isAvailable}
                            sx={{alignSelf: 'center',width:'50%'}} variant="contained" size="medium" onClick={handelJoinActivity}> הצטרף לפעילות</Button>}
                <MessageModal message={message} open={message !== ''} handleClose={handleOpenCloseModal}></MessageModal>
            </Box>
        </Modal>
    );
}

export default InitiativeModal;