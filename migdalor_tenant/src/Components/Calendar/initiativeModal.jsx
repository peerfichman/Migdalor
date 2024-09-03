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
    display:'flex',
    flexDirection:'column',
    marginBottom: 10,
    gap:10
})
const InitiativeModal = ({isParticipating, initiativeNumber, open, onClose, onInitiativeJoined}) => {

    const {user} = useContext(UserContext);

    const theme = useTheme()

    const [initiative, setInitiative] = useState({});
    const [message, setMessage] = useState('');
    const [isAvailable, setIsAvailable] = useState(true)
    const [availablePlaces, setAvailablePlaces] = useState(0)
    // const handleClose = () => setOpen();

    const handelJoinInitiative = async () => {
        await InitiativeRequests.JoinInitiative(initiativeNumber, user.id);
        await onInitiativeJoined();
        setMessage('הצטרפת בהצלחה ליוזמה')
    }
    const handelRemoveFromInitiative = async () => {
        await InitiativeRequests.RemoveFromInitiative(initiativeNumber, user.id);
        await onInitiativeJoined();
        setMessage('הוסרת בהצלחה מהיוזמה')
    }
    const handleOpenCloseModal = () => {
        setMessage('')
    }

    useEffect(() => {
        InitiativeRequests.GetInitiativeResidentParticipating(initiativeNumber)
            .then(particapnts => {

                setIsAvailable(particapnts.length < initiative.maxParticipants)
                setAvailablePlaces(initiative.maxParticipants - particapnts.length)
            })
        console.log(initiative)
    }, [initiative]);


    useEffect(() => {
        InitiativeRequests.GetInitiativeById(initiativeNumber)
            .then(init => {
                setInitiative(init)
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
                    flexDirection: 'column'
                }}>
                <Box sx={{
                    display: 'flex', marginTop: 2, width: "100%",
                    flexDirection: 'column',
                    justifyContent: 'center',

                }}>
                    <Button sx={{
                        alignSelf: 'start',
                        // marginTop: '1%',
                        marginRight: "3%"
                    }}>
                        <CloseIcon
                            onClick={onClose}/>
                    </Button>
                    <Typography variant={"h2"} sx={{color: 'black', alignSelf: 'center'}}>פרטי היוזמה</Typography>
                </Box>
                <Box
                    sx={{
                        marginRight: '10%',
                        marginTop: '2%'
                    }}>

                    <Row>
                        <Typography variant={"h5"}>שם היוזמה:</Typography>
                        <Typography>{initiative?.initiativeName}</Typography>
                    </Row>
                    <Row>

                        <Typography variant={"h5"}>תאריך:</Typography>
                        <Typography>{moment(initiative?.date).format("DD/MM/YYYY")}</Typography>
                    </Row>

                    <Row>

                        <Typography variant={"h5"}>שעת התחלה:</Typography>
                        <Typography>{moment(initiative?.startHour, "HH:mm:ss").format("HH:mm")}</Typography>
                    </Row>
                    <Row>

                        <Typography variant={"h5"}>שעת סיום:</Typography>
                        <Typography>{moment(initiative?.endHour, "HH:mm:ss").format("HH:mm")}</Typography>
                    </Row>

                    <Row>

                        <Typography variant={"h5"}>מס' מקמות נותר:</Typography>
                        <Typography>{availablePlaces}</Typography>
                    </Row>

                </Box>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:"20%"}}>
                    {isParticipating ?
                        <Button sx={{alignSelf: 'center', width: '50%'}}
                                color="error" variant="contained" size="medium"
                                onClick={handelRemoveFromInitiative}> בטל השתתפות </Button>
                        :
                        <Button disabled={!isAvailable}
                                sx={{alignSelf: 'center', width: '50%'}} variant="contained" size="medium"
                                onClick={handelJoinInitiative}> הצטרף ליוזמה</Button>}

                </Box>
                <MessageModal message={message} open={message !== ''} handleClose={handleOpenCloseModal}></MessageModal>
            </Box>
        </Modal>
    );
}

export default InitiativeModal;