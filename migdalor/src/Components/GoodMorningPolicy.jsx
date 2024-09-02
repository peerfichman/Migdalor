import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import * as GMPRequests from '../Requests/GMP/GMPRequests.jsx'
import {styled} from "@mui/material";

const columns = [
  { id: 'firstName', label: 'שם פרטי', minWidth: 100, align: 'right' },
  { id: 'lastName', label: 'שם משפחה', minWidth: 100, align: 'right' },
  { id: 'phoneNumber', label: 'טלפון', minWidth: 100, align: 'right' },
  { id: 'residentID', label: 'תעודת זהות', minWidth: 100, align: 'right' },
  { id: 'confirm', label: 'דיווח נוהל', minWidth: 100, align: 'right',
  },
];



const Status = styled('Box')({
  display: "flex",
  width: "75%",
  height: "25%",
  justifyContent: "center",
  opacity: "70%",
  borderRadius: 20,
  fontWeight:'bold'

})
export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [confirmedResident, setConfirmedResident] =useState([])
  const [notconfirmedResident, setNotConfirmedResident] =useState([])
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    GMPRequests.GetNotReportedResidents()
        .then(residents => residents.map( r =>  {return {...r , confirm: false}}))
        .then(residents => setNotConfirmedResident(residents))
    GMPRequests.GetReportedResidents()
        .then(residents => residents.map( r =>  {return {...r , confirm: true}}))
        .then(residents => setConfirmedResident(residents))

  }, []);
  useEffect(()=>{
    setRows([...confirmedResident,...notconfirmedResident])
  },[confirmedResident,notconfirmedResident])

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden', direction: 'rtl' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if(column.id ==='confirm') {
                        value = value ?
                            (<Status sx={{backgroundColor:"#8bc34a"}}>
                            דווח בהצלחה
                            </Status>) :
                            (
                                <Status sx={{backgroundColor:"#f44336"}}>
                                  טרם דווח
                                </Status>
                            )
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[ 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}