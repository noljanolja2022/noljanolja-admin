import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimeField, DateTimeFieldProps } from '@mui/x-date-pickers/DateTimeField';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export function DatePickerInput(props: DatePickerProps<Date> & React.RefAttributes<HTMLDivElement>) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker {...props} />
        </LocalizationProvider>
    )
}

export function DateTimeFieldInput(props: DateTimeFieldProps<Date> & React.RefAttributes<HTMLDivElement>) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField {...props} />
        </LocalizationProvider>
    )
}

export function DateTimePickerInput(props: DateTimePickerProps<dayjs.Dayjs> & React.RefAttributes<HTMLDivElement>) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker {...props}/>
        </LocalizationProvider>
    )
}