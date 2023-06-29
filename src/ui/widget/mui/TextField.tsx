import { styled } from '@mui/material/styles';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { MuiChipsInput, MuiChipsInputProps } from "mui-chips-input";

export const TextField = styled((props: MuiTextFieldProps) => (
  <MuiTextField {...props} />
))(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: "#F2F2F2",

    borderRadius: theme.spacing(1),
    '& fieldset': {
      borderColor: theme.palette.common.white,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.common.black,
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F2F2F2'
    },
  },
}));

export const ChipTextField = styled((props: MuiChipsInputProps) => (
  <MuiChipsInput {...props} />
))(({ theme }) => ({
  // '& label.Mui-focused': {
  //   backgroundColor: '#F2F2F2',
  // },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'green',
  // },
  // '& .MuiInputBase-root': {
  //   outerHeight: 300,
  // },
  '& .MuiOutlinedInput-root': {
    background: "#F2F2F2",

    borderRadius: theme.spacing(1),
    '& fieldset': {
      borderColor: theme.palette.common.white,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.common.black,
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F2F2F2'
    },
  },
}));