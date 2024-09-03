import * as React from 'react';
import {createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {Button, Container, TableHead, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import {useContext, useEffect, useState} from "react";
import * as InitiativesRequests from '../Requests/Initatives/InitativesRequests.jsx';
import {heIL} from "@mui/material/locale";
import moment from "moment";
import {styled} from "@mui/system";
import theme from "../Theme/Theme.jsx";
import BackButton from "./BackButton.jsx";
import {UserContext} from "../Auth/Auth.jsx";

const Row = ({row, onClick}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell dir={"rtl"}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell align="right" sx={{direction: 'rtl'}}>{moment(row.date,"YYYY-MM-DDT00:00:00").format('DD/MM/YYYY')}</TableCell>
                <TableCell align="right">{moment(row.startHour, "HH:mm:ss").format('HH:mm')}</TableCell>
                <TableCell align="right">{moment(row.endHour, "HH:mm:ss").format('HH:mm')}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell><Button variant="contained" onClick={(e)=> onClick(row.initiativeNumber)}>
                    ערוך יוזמה
                </Button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" style={{paddingBottom: 0, paddingTop: 0}} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
תיאור היוזמה                            </Typography>
                            <Typography>
                                {row.invitationDescription}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function TablePaginationActions(props) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };


    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}


const InitiativesTable = ({initiatives, openEdit}) =>{
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);

    const { user } = useContext(UserContext); // Retrieve the user ID from context

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const existingTheme = useTheme();

    const theme = React.useMemo(
        () =>
            createTheme({}, heIL, existingTheme, {
                direction: 'rtl',
            }),
        [existingTheme],
    );

    const handleChangePage = (
        event,
        newPage,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper} sx={{width:'90%' ,maxHeight: 400, height:800 }}>
                <Table  stickyHeader  sx={{minWidth: 500}} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width: 5}}/>
                                <TableCell align="right" sx={{width: '20%', fontWeight:'bold', fontSize:16}}>תאריך</TableCell>
                                <TableCell align="right" sx={{width:'20%', fontWeight:'bold', fontSize:16}}>שעת התחלה</TableCell>
                                <TableCell align="right" sx={{ fontWeight:'bold', fontSize:16}}>שעת סיום</TableCell>
                                <TableCell align="right" sx={{ fontWeight:'bold', fontSize:16}} >מיקום</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? initiatives.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : initiatives
                            ).map((row, i) => (
                                <Row onClick={openEdit} key={i} row={row}></Row>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    colSpan={6}
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
        </ThemeProvider>
    );
}
export default  InitiativesTable;