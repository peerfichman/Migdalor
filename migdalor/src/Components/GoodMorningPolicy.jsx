import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
{ id: 'residentNumber', label: 'שם הדייר', minWidth: 100, align: 'right' },
  { id: 'firstName', label: 'שם פרטי', minWidth: 100, align: 'right' },
  { id: 'lastName', label: 'שם משפחה', minWidth: 100, align: 'right' },
  { id: 'phone', label: 'טלפון', minWidth: 100, align: 'right' },
  { id: 'ID', label: 'תעודת זהות', minWidth: 100, align: 'right' },
  { id: 'timeOfPolicy', label: 'שעת ביצוע הנוהל', minWidth: 100, align: 'right', 
  },
];

function createData(residentNumber, firstName, lastName, phone, ID, timeOfPolicy) {
  
  return { residentNumber, firstName, lastName, phone, ID, timeOfPolicy};
}

const rows = [
  createData(1, 'טל ', 'כהן', "0527532227", "12345"),
  createData(2, 'אניטה ', 'סטבליאנקו', "0526928001", "23456"),
  createData(3, 'ענר ', 'עוזר', "0507192225", "34567"),
  createData(4, 'ניר ', 'חן', "0507192226", "45678")
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                      const value = row[column.id];
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