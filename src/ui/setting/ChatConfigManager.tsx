import { useEffect, useState } from "react";
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "../widget/mui";
import { ChatRewardConfig } from "../../data/model/ConfigModels";
import ChatConfigEditor from "./ChatConfigEditor";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import useChatRewardConfig from "../../hook/useChatRewardConfig";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";

export default function ChatConfigManager() {
    const { t } = useTranslation();
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
                    <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {chatConfigs.map(item =>
                    <TableRow key={item.roomType}>
                        <TableCell >{item.roomType}</TableCell>
                        <TableCell >{item.isActive ? <CheckIcon color="success" /> : <CloseIcon color="error" />}</TableCell>
                        <TableCell >
                            <Tooltip title={t('label_edit')}>
                                <EditIcon cursor={'pointer'} onClick={() => setEditData(item)} />
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {editData && <ChatConfigEditor data={editData}
            onClose={() => setEditData(null)} />}
    </Stack>
}