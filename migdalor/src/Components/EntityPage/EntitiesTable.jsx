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
import DeleteIcon from '@mui/icons-material/Delete';
import EntitiesMap from "./EntitiesMap.jsx";
import moment from "moment";
const  EntityRow = ({entity, entityName})=> {
    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] =React.useState(false);

    const handelDelete = async (e)=>{
        e.preventDefault();
        await EntitiesMap[entityName].requests.delete(entity.id);
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {entity.description && <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>}
                {Array.from(EntitiesMap[entityName].columns.keys()).map((col) => {
                    let val = entity[col];
                    if(col==='time') val =  moment(val, 'HH:mm:ss').format('HH:mm');
                    if(col==='date') val = moment(val, 'yyyy-MM-DDT00:00:00').format('DD/MM/yyyy')
                    return <TableCell key={col} aligh="right">{val}</TableCell>
                })
                }
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
                {
                    entity.description && <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography align="right" variant="h6" gutterBottom component="div">
                                תיאור
                            </Typography>
                            <Typography textAlign="right" variant="sapn" gutterBottom component="div">
                                {entity.description}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
                }
            </TableRow>
            {/*{modalOpen && <CreateActivity isEdit={true} setModalOpen={setModalOpen} activityNumber={activity.activityNumber}/>}*/}
        </React.Fragment>
    );
}


// eslint-disable-next-line react/prop-types
const  EntityTable = ({entityName, entities})=> {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow >
                        <TableCell  sx={{width:'1%'}} />
                        {Array.from(EntitiesMap[entityName].columns.values()).map((colName) => {
                            return <TableCell key={colName} align="right">{colName}</TableCell>
                        })}
                        <TableCell/>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entities.map((entity) =>
                        <EntityRow key={entity.Id} entity={entity} entityName={entityName}/>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EntityTable;