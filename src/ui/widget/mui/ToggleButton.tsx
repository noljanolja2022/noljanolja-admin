import MuiToggleButton, { ToggleButtonProps as MuiToggleButtonProps } from "@mui/material/ToggleButton";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)((props) => ({

}));

export const ToggleButton = styled((props: MuiToggleButtonProps) => (
    <MuiToggleButton {...props} />
))(({ theme }) => ({
    "&.MuiToggleButton-root:hover": {
        backgroundColor: theme.palette.secondary.main
    },
    "&.Mui-selected": {
        backgroundColor: theme.palette.primary.main
    },
    background: theme.palette.common.gray[600]
}));
