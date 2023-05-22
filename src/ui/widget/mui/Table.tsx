import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import MuiTableHead, { TableHeadProps as MuiTableHeadProps } from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";

const TableHead = styled((props: MuiTableHeadProps) => (
    <MuiTableHead {...props} />))(({ theme }) => ({
        backgroundColor: theme.palette.secondary.main
    }));

export { TableContainer, Table, TableHead, TableRow, TableCell, TableBody }