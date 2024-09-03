import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {useContext, useEffect, useState} from "react";
import * as ActivitiesRequests from '../../Requests/Activities/ActivitiesRequests.jsx'
import MessageModal from "../MessageModal.jsx";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";
import moment from "moment";
import {UserContext} from "../../Auth/Auth.jsx";


const Row = styled('Box')({
    marginBottom: 10,
    display:'flex',
    flexDirection:'column',

    gap:10
})
const ActivityModal = ({isParticipating, initiativeNumber, open, onClose, onActivityJoined}) => {

    const {user} = useContext(UserContext);

    const theme = useTheme()

    const [activity, setActivity] = useState({});
    const [message, setMessage] = useState('');
    const [isAvailable , setIsAvailable] = useState(true)
    const [availablePlaces , setAvailablePlaces] = useState(true)
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
            .then(particapnts => {
                    setIsAvailable(particapnts.length < activity.maxParticipants)
                    setAvailablePlaces(activity.maxParticipants  - particapnts.length)
                }
            )

    }, [activity]);


    useEffect(() => {
        ActivitiesRequests.GetActivityById(initiativeNumber)
            .then(act => {
                setActivity(act)
            })
    }, [initiativeNumber])
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
                    height: "90vh",
                    width: "80%",
                    backgroundColor: '#F6F2E4',
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
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
                        width:'100vh'
                    }}
                >
                    <Row>
                        <Typography variant={"h5"}>שם הפעילות:</Typography>
                        <Typography>{activity?.activityName}</Typography>
                    </Row>
                    <Row>

                        <Typography variant={"h5"}>תאריך:</Typography>
                        <Typography>{moment(activity?.date).format("DD/MM/YYYY")}</Typography>
                    </Row>

                    <Row>

                        <Typography variant={"h5"}>שעת התחלה:</Typography>
                        <Typography>{moment(activity?.time, "HH:mm:ss").format("HH:mm")}</Typography>
                    </Row>

                    <Row>

                        <Typography variant={"h5"}>מס' מקומות נותר:</Typography>
                        <Typography>{availablePlaces}</Typography>
                    </Row>

                    <Row>

                        <Typography variant={"h5"}>תיאור נוסף:</Typography>
                        <Typography>{activity?.description}</Typography>
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

export default ActivityModal;