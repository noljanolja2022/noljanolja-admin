import IconButton from "@mui/material/IconButton";
import { useLoadingStore } from "../../store/LoadingStore";
import { Box, Snackbar, Typography, useTheme } from "./mui";
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarState } from "../../data/enum/ViewState";

export default function NotificationOverlay() {
    const { snackBarProps, clearSnackBar } = useLoadingStore();
    const theme = useTheme();
    const onClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        clearSnackBar()
    };

    const getColor = () => {
        return snackBarProps?.state === SnackbarState.SUCCESS
            ? theme.palette.common.green[100]
            : theme.palette.common.red[200]
    }

    return (
        <Snackbar
            open={snackBarProps != null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={5000}
            onClose={onClose}
        >
            <div style={{
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 8,
                backgroundColor: getColor(),
                color: 'white',
                display: 'flex',
                alignItems:'center',
                flexDirection: 'row',
                borderRadius: 4
            }}>
                <Box maxWidth={240}>
                    <Typography>{snackBarProps?.message}</Typography>
                </Box>
                <Box>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            </div>
        </Snackbar>
    )
}