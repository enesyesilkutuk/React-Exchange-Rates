import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAppContext from '../context/AppContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TableComp() {
  const {data, currencyChange} = useAppContext();
  const filteredData = data.filter((item) => {
    return(
      Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(currencyChange.toLowerCase()))
    )
  }
  )
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Currency Name</StyledTableCell>
            <StyledTableCell>Buy</StyledTableCell>
            <StyledTableCell>Sell</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <StyledTableRow key={row.CurrencyName}>
              <StyledTableCell component="th" scope="row">
                {row.CurrencyName}
              </StyledTableCell>
              <StyledTableCell>{row.BanknoteBuying || row.ForexBuying} ₺</StyledTableCell>
              <StyledTableCell>{row.BanknoteSelling || row.ForexSelling} ₺</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}