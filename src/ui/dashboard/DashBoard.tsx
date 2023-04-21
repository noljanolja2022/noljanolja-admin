import { useUserStore } from "../../store/UserStore";
import { Box, Typography } from "../widget/mui";

function DashBoard() {
    const { user } = useUserStore();

    return (
        <Box padding={4} flex={1} flexDirection={"column"}>
            This is dashboard. If you see this exact message, it means this is version updated on 20/4/2023
            <br />
            Your Info
            <Typography>Name: {user?.name}</Typography>
            <Typography>Email: {user?.email}</Typography>
            <Typography>Phone: {user?.phone}</Typography>
        </Box>
    )
}

export default DashBoard;