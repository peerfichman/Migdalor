import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {Typography} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#F6F2E4',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const MessageModal = ({message, open , handleClose}) => {

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <Typography variant={"h7"} id="child-modal-description">
                        {message}
                    </Typography>
                    <Button onClick={handleClose}>סגור</Button>
                </Box>
            </Modal>
        </React.Fragment>

    );
}

export default MessageModal;