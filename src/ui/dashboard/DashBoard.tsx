import { useUserStore } from "../../store/UserStore";
import { Box, Typography } from "../widget/mui";

function DashBoard() {
    const { user } = useUserStore();

    return (
        <Box p={4} display={"flex"} flexDirection={"column"}>
        </Box>
    )
}

export default DashBoard;