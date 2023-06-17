import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const Select = styled((props: MuiSelectProps) => (
    <MuiSelect {...props} />
))(({ theme }) => ({

}));

export { Select }