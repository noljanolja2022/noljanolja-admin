import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import NoljaRoutes from "../util/routes";
import { theme } from "../util/theme";
import LoadingOverlay from "./widget/LoadingOverlay";
import NotificationOverlay from "./widget/NotificationOverlay";

export default function App() {
    return <ThemeProvider theme={theme(false)}>
        <CssBaseline />
        <LoadingOverlay />
        <NotificationOverlay/>
        <NoljaRoutes />
    </ThemeProvider>
}