import { parseDate } from "../../util/DateUtil";
import { Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "../widget/mui";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useBannerManager from "../../hook/useBannerManager";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Banner } from "../../data/model/BannerModels";
import BannerEditorDialog from "./BannerEditorDialog";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import BannerFilter from "./BannerFilter";

export default function BannerManager() {
    const { t } = useTranslation();
    const { data, totalPage, fetch, currentPage, setCurrentPage } = useBannerManager();
    const [editing, setEditing] = useState<Nullable<Partial<Banner>>>(null);
    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        fetch();
    }, [])

    return (
        <Stack spacing={1} p={2}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'between', alignItems: 'center' }}>
                <BannerFilter />
                <Button onClick={() => setEditing({})} startIcon={<AddIcon />}>
                    {t('label_add')}
                </Button>
            </Box>
            <Table sx={{ minWidth: 650, }}
                cellSpacing={20}
                aria-label="item table">
                <TableHead>
                    <TableRow >
                        <TableCell>{t('label_thumbnail')}</TableCell>
                        <TableCell sx={{ maxWidth: '300px'}}>{t('label_name')}</TableCell>
                        <TableCell>{t('label_description')}</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>{t('label_start_date')}</TableCell>
                        <TableCell>{t('label_end_date')}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item =>
                        <TableRow key={item.id}>
                            <TableCell align="left" sx={{ width: 100, height: 100 }} >
                                <img src={item.image} alt={item.title} className="auto-scale-thumbnail" />
                            </TableCell>
                            <TableCell sx={{ maxWidth: '180px', minWidth: '150px' }}>
                                {item.title}
                            </TableCell>
                            <TableCell >{item.description}</TableCell>
                            <TableCell >{item.isActive ? <CheckIcon color="success" /> : <CloseIcon color="error" />}</TableCell>
                            <TableCell >{item.priority}</TableCell>
                            <TableCell >{parseDate(new Date(item.startTime))}</TableCell>
                            <TableCell >{parseDate(new Date(item.endTime))}</TableCell>

                            <TableCell >
                                <Tooltip title={t('label_edit')}>
                                    <EditIcon cursor={'pointer'} onClick={() => setEditing(item)} />
                                </Tooltip>
                                <Tooltip title={t('label_delete')}>
                                    <DeleteIcon cursor={'pointer'} />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
            {editing && <BannerEditorDialog data={editing} onClose={() => setEditing(null)} />}
        </Stack>
    )
}