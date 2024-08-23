import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import CreateActivity from "./CreateActivity.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import * as activityRequests from '../Requests/Activity/activitiesRequests.jsx';
const  ActivityRow = ({activity})=> {
    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] =React.useState(false);

    const handelDelete = async (e)=>{
        e.preventDefault();
        await activityRequests.deleteActivity(activity.activityNumber);
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right">{activity.activityName}</TableCell>
                <TableCell align="right">{new Date(activity.date).toLocaleDateString('he-IL')}</TableCell>
                <TableCell align="right">{activity.time}</TableCell>
                <TableCell align="right">{activity.maxParticipants}</TableCell>
                <TableCell>
                    <IconButton color='primary' onClick={(e) =>setModalOpen(true)}>
                        <EditIcon/>
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton color='error' onClick={handelDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography align="right" variant="h6" gutterBottom component="div">
                                תיאור
                            </Typography>
                            <Typography textAlign="right" variant="sapn"   gutterBottom component="div">
                                {activity.description}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {modalOpen && <CreateActivity isEdit={true} setModalOpen={setModalOpen} activityNumber={activity.activityNumber}/>}
        </React.Fragment>
    );
}


// eslint-disable-next-line react/prop-types
const  ActivityTable = ({activities})=> {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{width:'1%'}} />
                        <TableCell align="right">שם </TableCell>
                        <TableCell align="right">תאריך</TableCell>
                        <TableCell align="right">שעה</TableCell>
                        <TableCell align="right">מס' משתתפים</TableCell>
                        <TableCell/>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activities.map((activity) => (
                        <ActivityRow key={activity.activityNumber} activity={activity}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ActivityTable;