import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Gift } from "../../data/model/Gift";
import useBrandManager from "../../hook/useBrandManager";
import useGiftManager from "../../hook/useGiftManager";
import { parseDate } from "../../util/DateUtil";
import { Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "../widget/mui";
import { GiftEditorDialog } from "./GiftEditorDialog";

export default function GiftManager() {
    const { t } = useTranslation();
    const { data, fetchCategories, totalPage, currentPage, setCurrentPage, fetchGifts, deleteGift } = useGiftManager();
    const { fetchBrands } = useBrandManager();
    const [editing, setEditing] = useState<Nullable<Partial<Gift>>>(null);

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        fetchGifts()
    }, [currentPage])


    useEffect(() => {
        fetchCategories();
        fetchBrands()
    }, [])


    return <Stack spacing={1} p={2}>
        <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
            <Button onClick={() => setEditing({})}>
                <AddIcon />
                {t('label_add')}
            </Button>
        </Box>
        <Table sx={{ minWidth: 650, }}>
            <TableHead>
                <TableRow >
                    <TableCell >{t('label_thumbnail')}</TableCell>
                    <TableCell sx={{ maxWidth: '300px' }}>{t('label_name')}</TableCell>
                    <TableCell >{t('label_price')}</TableCell>
                    <TableCell >{t('label_remaining')}</TableCell>
                    <TableCell >{t('label_total')}</TableCell>
                    <TableCell >{t('label_description')}</TableCell>
                    <TableCell >{t('label_effective_date')}</TableCell>
                    <TableCell >{t('label_expire_date')}</TableCell>
                    <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(item =>
                    <TableRow key={item.id}>
                        <TableCell align="left" sx={{ width: 100, height: 100 }} >
                            <img src={item.image} alt={item.name} className='auto-scale-thumbnail' />
                        </TableCell>
                        <TableCell sx={{ maxWidth: '180px', minWidth: '150px' }}>
                            {item.name}
                        </TableCell>
                        <TableCell >
                            {item.price}
                        </TableCell>
                        <TableCell >{item.remaining}</TableCell>
                        <TableCell >{item.total}</TableCell>
                        <TableCell >
                            {item.description}
                        </TableCell>
                        <TableCell >
                            {parseDate(item.startTime)}
                        </TableCell>
                        <TableCell >
                            {parseDate(item.endTime)}
                        </TableCell>
                        <TableCell>
                            <Tooltip title={t('label_edit')}>
                                <IconButton onClick={() => setEditing(item)} ><EditIcon /></IconButton>
                            </Tooltip>
                            <Tooltip title={t('label_delete')}>
                                <IconButton onClick={() => deleteGift(item)} ><DeleteIcon /></IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
        {editing && <GiftEditorDialog data={editing} onClose={() => setEditing(null)} />}
    </Stack>
}