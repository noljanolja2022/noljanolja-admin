import { useEffect, useState } from "react";
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "../widget/mui";
import { ApiChatRewardConfig, ChatRewardConfig, RoomType } from "../../data/model/ConfigModels";
import ChatRewardCard from "../widget/ChatRewardCard";
import rewardService from "../../service/RewardService";
import { useLoadingStore } from "../../store/LoadingStore";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
export default function ChatRewardSetting() {
    const [data, setData] = useState<ApiChatRewardConfig[]>([]);
    const { setLoading, setIdle, viewState } = useLoadingStore();
    const [editData, setEditData] = useState<ChatRewardConfig | null>(null);

    useEffect(() => {
        onFetch();
    }, [])

    const onFetch = () => {
        setLoading()
        rewardService.getChatRewardConfigs().then(res => {
            if (res.isFailure()) {
                return;
            }
            setData(res.data || [])
        }).finally(() => {
            setIdle();
        })
    }

    const onNew = () => {
        setEditData({})
    }

    return <Stack p={2} gap={2}>
        {/* <Box>
            <Button onClick={onNew}>Add Config</Button>
        </Box> */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="chat-reward-setting-table">
                <TableHead>
                    <TableRow>
                        <TableCell >Room Type</TableCell>
                        <TableCell >Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item =>
                        <TableRow key={item.roomType} hover sx={{
                            cursor: 'pointer'
                        }} onClick={() => setEditData(item)}>
                            <TableCell >{item.roomType}</TableCell>
                            <TableCell >{item.isActive ? <CheckIcon /> : <CloseIcon />}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        {editData && <ChatRewardCard data={editData}
            onClose={() => setEditData(null)} />}
    </Stack>
}