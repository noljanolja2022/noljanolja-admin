import MuiBox, { BoxProps as MuiBoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Box = styled((props: MuiBoxProps) => (
    <MuiBox {...props} />
))(({ theme }) => ({

}));

export const SidebarBox = styled((props: MuiBoxProps) => (
    <MuiBox {...props} sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        height: '2.5rem',
        gap: '0.5rem',
        color: 'white',
        paddingRight: 2,
        backgroundColor: '#2D363D',
    }} />
))(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.grey[800],
    },
}));