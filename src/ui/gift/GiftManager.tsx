import { t } from "i18next";
import { Box, Link, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Pagination, Stack, Button } from "../widget/mui";
import useGiftManager from "../../hook/useGiftManager";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { GiftEditorDialog } from "./GiftEditorDialog";
import useBrandManager from "../../hook/useBrandManager";
import { parseDate } from "../../util/DateUtil";
import { Gift } from "../../data/model/Gift";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GiftManager() {
    const { gifts, fetchCategories, totalPage, currentPage, setCurrentPage, fetchGifts, deleteGift } = useGiftManager();
    const { fetchBrands } = useBrandManager();
    const [editing, setEditing] = useState<Nullable<Gift>>(null);

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
            <Button onClick={() => setEditing({ id: -1 })}>
                <AddIcon />
                {t('label_add')}
            </Button>
        </Box>
        <Table sx={{ minWidth: 650, }}>
            <TableHead>
                <TableRow >
                    <TableCell >Image</TableCell>
                    <TableCell sx={{ maxWidth: '300px', fontWeight: 700 }}>{t('label_name')}</TableCell>
                    <TableCell >Price</TableCell>
                    <TableCell >Description</TableCell>
                    <TableCell >Effective Date</TableCell>
                    <TableCell >Expiring Date</TableCell>
                    <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {gifts.map(item =>
                    <TableRow key={item.id}>
                        <TableCell align="left" sx={{ width: 100, height: 100 }} >
                            <img src={item.image} alt={item.name} style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }} />
                        </TableCell>
                        <TableCell sx={{ maxWidth: '180px', minWidth: '150px' }}>
                            {item.name}
                        </TableCell>
                        <TableCell >
                            {item.price}
                        </TableCell>
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
                            <EditIcon cursor={'pointer'} onClick={() => setEditing(item)} />
                            <DeleteIcon cursor={'pointer'} onClick={() => deleteGift(item)} />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
        {editing && <GiftEditorDialog data={editing} onClose={() => setEditing(null)} />}
    </Stack>
}