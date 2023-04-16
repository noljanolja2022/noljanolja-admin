import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";

const PrimaryTextField = styled(TextField)({
  // '& label.Mui-focused': {
  //   backgroundColor: '#F2F2F2',
  // },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'green',
  // },
  '& .MuiOutlinedInput-root': {
    background: "#F2F2F2",
    borderRadius: '8px',
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F2F2F2'
    },
  },
});

export {
  PrimaryTextField
}