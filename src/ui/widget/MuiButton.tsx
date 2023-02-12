import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

const PrimaryToggleButton = styled(MuiToggleButton)({
    "&.MuiToggleButton-root:hover" : {
        backgroundColor: '#faf73c'
    },
    "&.Mui-selected": {
        backgroundColor: '#be4823'
    }
});

export {
    PrimaryToggleButton
}