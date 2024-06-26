import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Gift, GiftBrand, GiftCategory } from "../../data/model/Gift";
import useBrandManager from "../../hook/useBrandManager";
import useGiftCategoryManager from '../../hook/useGiftCategory';
import useGiftManager from "../../hook/useGiftManager";
import giftService from '../../service/GiftService';
import { useLoadingStore } from '../../store/LoadingStore';
import { parseDate } from "../../util/DateUtil";
import { Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "../widget/mui";
import { GiftEditorDialog } from "./GiftEditorDialog";
import GiftFilter from './GiftFilter';
import { GiftAddDialogParams, GiftAddDialog } from './GiftAddDialog';

export default function GiftManager() {
    const { setLoading, setIdle } = useLoadingStore();
    const { t } = useTranslation();
    const { data, totalPage, currentPage, setCurrentPage, fetchGifts, deleteGift } = useGiftManager();
    const { fetchBrands } = useBrandManager();
    const { fetch: fetchCategory } = useGiftCategoryManager();
    const [editing, setEditing] = useState<Nullable<Gift>>(null);
    const [adding, setAdding] = useState<Nullable<GiftAddDialogParams>>(null);

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const onImport = () => {
        setLoading();
        giftService.importGifts().then(res => {
            fetchGifts()
        }).finally(() => {
            setIdle()
        })
    }

    useEffect(() => {
        fetchGifts()
    }, [currentPage])

    useEffect(() => {
        fetchBrands();
        fetchCategory()
    }, [])



    return <Stack spacing={1} p={2}>
        <GiftFilter />
        
        <Box sx={{ display: 'flex', justifyContent: 'end', flexGrow: 1, gap: 2, flexDirection: 'row' }}>
            <Button onClick={onImport}>Sync data with GiftBiz</Button>
            
            <Button onClick={
                () => {
                    let brands: GiftBrand[] = [];
                    let categories: GiftCategory[] = [];
                    giftService.fetchBrands("", "IN", 1, 1000).then(res => {
                        if (res.isFailure()) {
                            return;
                        }
                        brands.push(...res.data ?? [])
                    }).finally(() => {
                        giftService.fetchCategories("", 1, 100).then(res => {
                            if (res.isFailure()) {
                                return;
                            }
                            categories.push(...res.data ?? [])
                        }).finally(() => {
                            setAdding({
                                brands: brands,
                                categories: categories
                            })
                        })
                    })
                }
            }><AddIcon />{t('label_add')}</Button>
        </Box>
        <Table sx={{ minWidth: 650, }}>
            <TableHead>
                <TableRow >
                    <TableCell >{t('label_thumbnail')}</TableCell>
                    <TableCell sx={{ maxWidth: '300px' }}>{t('label_name')}</TableCell>
                    <TableCell >{t('label_price')}</TableCell>
                    <TableCell >{t('label_description')}</TableCell>
                    <TableCell >{t('label_expire_date')}</TableCell>
                    <TableCell >{t('label_status')}</TableCell>
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
                        <TableCell sx={{ maxWidth: '700px' }}>
                            {item.description}
                        </TableCell>
                        <TableCell >
                            {parseDate(item.endTime)}
                        </TableCell>
                        <TableCell >{item.isActive ? <CheckIcon color="success" /> : <CloseIcon color="error" />}</TableCell>
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
        {adding && <GiftAddDialog data={adding} onClose={() => setAdding(null)}/>}
    </Stack>
}