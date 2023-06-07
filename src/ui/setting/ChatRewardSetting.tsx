import { useEffect, useState } from "react";
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from "../widget/mui";
import { ChatRewardConfig } from "../../data/model/ConfigModels";
import ChatRewardCard from "../widget/ChatRewardCard";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import useChatRewardConfig from "../../hook/useChatRewardConfig";

export default function ChatRewardSetting() {
    const { chatConfigs, fetchChatConfig } = useChatRewardConfig();
    const [editData, setEditData] = useState<Nullable<ChatRewardConfig>>(null);

    useEffect(() => {
        fetchChatConfig();
    }, [])

    return <Stack p={2} gap={2}>
        <Table sx={{ maxWidth: 650 }} aria-label="chat-reward-setting-table">
            <TableHead>
                <TableRow>
                    <TableCell >Room Type</TableCell>
                    <TableCell >Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {chatConfigs.map(item =>
                    <TableRow key={item.roomType} hover sx={{
                        cursor: 'pointer'
                    }} onClick={() => setEditData(item)}>
                        <TableCell >{item.roomType}</TableCell>
                        <TableCell >{item.isActive ? <CheckIcon /> : <CloseIcon />}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {editData && <ChatRewardCard data={editData}
            onClose={() => setEditData(null)} />}
    </Stack>
}