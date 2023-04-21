import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const Button = styled((props: MuiButtonProps) => (
    <MuiButton variant="contained" {...props}/>))(({ theme }) => ({

    }));