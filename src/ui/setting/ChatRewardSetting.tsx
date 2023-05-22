import { useState } from "react";
import { theme } from "../../util/theme";
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "../widget/mui";
import { ApiChatRewardConfig, ChatRewardConfig, RoomType } from "../../data/model/ConfigModels";
import ChatRewardCard from "../widget/ChatRewardCard";

export default function ChatRewardSetting() {
    const [data, setData] = useState<ApiChatRewardConfig[]>([]);
    const [editData, setEditData] = useState<ChatRewardConfig | null>(null);

    const onNew = () => {
        setEditData({})
    }

    return <Stack p={2} gap={2}>
        <Box>
            <Button onClick={onNew}>Add Config</Button>
        </Box>
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
                        <TableRow key={item.id} hover sx={{
                            cursor: 'pointer'
                        }} onClick={() => setEditData(item)}>
                            <TableCell >{item.roomType}</TableCell>
                            <TableCell >{item.isActive}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <ChatRewardCard data={editData}
            onClose={() => setEditData(null)} />
    </Stack>
}