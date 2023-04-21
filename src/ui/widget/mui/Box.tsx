import MuiBox from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Box = styled(MuiBox)((props) => ({

}));

export const SidebarBox = styled(MuiBox)((props) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    height: '2.5rem',
    gap: '0.5rem',
    color: 'white',
    '&:hover': {
        backgroundColor: 'gray',
    },
}));