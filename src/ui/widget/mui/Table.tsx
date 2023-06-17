import TableContainer from "@mui/material/TableContainer";
import MuiTable, { TableProps as MuiTableProps } from "@mui/material/Table";
import MuiTableHead, { TableHeadProps as MuiTableHeadProps } from "@mui/material/TableHead";
import MuiTableRow, { TableRowProps as MuiTableRowProps } from "@mui/material/TableRow";
import MuiTableCell, { TableCellProps as MuiTableCellProps } from "@mui/material/TableCell";
import MuiTableBody, { TableBodyProps as MuiTableBodyProps } from "@mui/material/TableBody";
import { alpha, styled } from "@mui/material/styles";

const Table = styled((props: MuiTableProps) => (
    <MuiTable {...props} sx={{
    }} />))(({ theme }) => ({
        borderCollapse: 'separate',
        borderSpacing: `0 ${theme.spacing(2)}`
    }));

const TableHead = styled((props: MuiTableHeadProps) => (
    <MuiTableHead {...props} />))(({ theme }) => ({
        "& .MuiTableRow-root .MuiTableCell-root": {
            fontWeight: 700,
        },
        backgroundColor: theme.palette.secondary.main,
    }));

const TableHeadRow = styled((props: MuiTableRowProps) => (
    <MuiTableRow {...props}
    />))(({ theme }) => ({
    }));

const TableBody = styled((props: MuiTableBodyProps) => (
    <MuiTableBody {...props} />))(({ theme }) => ({
        "& .MuiTableRow-root:nth-of-type(odd)": {
            backgroundColor: theme.palette.grey[200]
        },
        "& .MuiTableRow-root:nth-of-type(even)": {
            backgroundColor: theme.palette.grey[300]
        },
        "& .MuiTableRow-root": {
            backgroundColor: theme.palette.grey[300],
            boxShadow: `2px 2px ${alpha(theme.palette.grey[500], 0.4)}`,
            borderRadius: theme.spacing(1),
        },
    }));

const TableRow = styled((props: MuiTableRowProps) => (
    <MuiTableRow {...props}

    />))(({ theme }) => ({
        // "&:nth-child(odd)": {
        //     backgroundColor: theme.palette.grey[300]
        // },
        // "&:nth-child(even)": {
        //     backgroundColor: theme.palette.grey[100]
        // },

    }));

const TableCell = styled((props: MuiTableCellProps) => (
    <MuiTableCell {...props}
        sx={{
            borderBottom: 'none',
        }}
    />))
    (({ theme }) => ({
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),

        "&:first-of-type": {
            borderTopLeftRadius: theme.spacing(1),
            borderBottomLeftRadius: theme.spacing(1)
        },
        "&:last-of-type": {
            borderTopRightRadius: theme.spacing(1),
            borderBottomRightRadius: theme.spacing(1)
        }
    }));
export { TableContainer, Table, TableHead, TableRow, TableCell, TableHeadRow, TableBody }