import { Stack } from "../widget/mui";
import VideoPromotionEditor from "./VideoPromotionEditor";

export default function VideoPromotionManager() {

    return (
        <Stack spacing={1} p={2}>
            <VideoPromotionEditor />
        </Stack>
    )
}
