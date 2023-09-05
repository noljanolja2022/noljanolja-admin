import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Banner } from "../../data/model/BannerModels";
import useBannerManager from "../../hook/useBannerManager";
import { parseDate } from "../../util/DateUtil";
import ConfirmDialog from '../widget/ConfirmDialog';
import { Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "../widget/mui";
import BannerEditorDialog from "./BannerEditorDialog";
import BannerFilter, { BannerSearchProps } from "./BannerFilter";

export default function BannerManager() {
    const { t } = useTranslation();
    const { data, totalPage, fetch, currentPage, setCurrentPage, deleteBanner } = useBannerManager();
    const [editing, setEditing] = useState<Nullable<Partial<Banner>>>(null);
    const [deleting, setDeleting] = useState<Nullable<Banner>>(null);
    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        fetch();
    }, [currentPage])

    const onSearch = (input: BannerSearchProps) => {
        fetch(input.name)
    }

    const onDelete = () => {
        if (deleting) {
            deleteBanner(deleting);
        }
        setDeleting(null);
    }

    return (
        <Stack spacing={1} p={2}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'between', alignItems: 'center' }}>
                <BannerFilter onSearch={onSearch} />
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
                        <TableCell sx={{ maxWidth: '300px' }}>{t('label_name')}</TableCell>
                        <TableCell>{t('label_description')}</TableCell>
                        <TableCell>{t('label_status')}</TableCell>
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
                                    <IconButton onClick={() => setEditing(item)} ><EditIcon /></IconButton>
                                </Tooltip>
                                <Tooltip title={t('label_delete')}>
                                    <IconButton onClick={() => setDeleting(item)}><DeleteIcon /></IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
            {editing && <BannerEditorDialog data={editing} onClose={() => setEditing(null)} />}
            <ConfirmDialog
                onSubmit={onDelete}
                visible={deleting != null}
                onClose={() => setDeleting(null)}>
                <Box>Are you sure you want to delete this banner <Typography display={'inline'} fontWeight={700}>{deleting?.title}</Typography>?</Box>
            </ConfirmDialog>
        </Stack>
    )
}