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
import { TableHead, Typography} from "@mui/material";

import {useEffect, useState} from "react";
import * as ResidentRequests from '../Requests/ResidentRequests/ResidentRequests.jsx'
import {heIL} from "@mui/material/locale";
import {styled} from "@mui/system";
import theme from "../Theme/Theme.jsx";
import BackButton from "./BackButton.jsx";

const Row = ({row}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell align="right" sx={{direction: 'rtl'}}>{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
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

const StyledBox = styled('Box')({
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    width: '75%',
    height: '85vh',
    borderRadius: 20,
    overflow:'auto'

});

export default function Contacts() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);
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

    useEffect(() => {
        ResidentRequests.GetAllResidents()
            .then((residents) => {
                console.log("residents", residents)
                setRows(residents)
            })
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <BackButton/>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <StyledBox>
                    <Typography variant={"h2"} sx={{marginBottom: 2}}>אנשי קשר</Typography>
                    <TableContainer component={Paper} sx={{width:'90%' ,maxHeight: 400, height:800 }}>
                        <Table stickyHeader  sx={{minWidth: 500 }} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" sx={{width: '20%', fontWeight:'bold', fontSize:16 }}>שם פרטי</TableCell>
                                    <TableCell align="right" sx={{width: '20%', fontWeight:'bold', fontSize:16 }}>שם משפחה</TableCell>
                                    <TableCell align="right" sx={{width: '20%',fontWeight:'bold', fontSize:16}}>מספר טלפון</TableCell>
                                    <TableCell align="right" sx={{fontWeight:'bold', fontSize:16}}>אימייל</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                ).map((row, i) => (
                                    <Row key={i} row={row}></Row>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 53 * emptyRows}}>
                                        <TableCell colSpan={999}/>
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
                                        colSpan={999}
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
                </StyledBox>
            </div>
        </ThemeProvider>
    );
}
