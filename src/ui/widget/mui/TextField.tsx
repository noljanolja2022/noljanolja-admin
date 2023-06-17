import { styled } from '@mui/material/styles';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

export const TextField = styled((props: MuiTextFieldProps) => (
  <MuiTextField {...props} />
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