import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GiftBrand } from "../../data/model/Gift";
import useBrandManager from "../../hook/useBrandManager";
import { Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "../widget/mui";
import BrandEditorDialog from "./BrandEditorDialog";
import BrandFilter from "./BrandFilter";

export default function BrandManager() {
    const { t } = useTranslation();
    const { brands, fetchBrands, currentPage, setCurrentPage, totalPage } = useBrandManager();
    const [editing, setEditing] = useState<Nullable<Partial<GiftBrand>>>(null);

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        fetchBrands()
    }, [currentPage])

    return <Stack spacing={1} p={2}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'between', alignItems: 'center' }}>
            <BrandFilter />
            <Button onClick={() => setEditing({})} startIcon={<AddIcon />}>
                {t('label_add')}
            </Button>
        </Box>

        <Table sx={{ maxWidth: 550 }}>
            <TableHead>
                <TableRow >
                    <TableCell>{t('label_thumbnail')}</TableCell>
                    <TableCell sx={{ maxWidth: '300px' }}>{t('label_name')}</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {brands.map(item =>
                    <TableRow key={item.id}>
                        <TableCell align="left" sx={{ width: 100, height: 100 }} >
                            <img src={item.image} alt={item.name} className='auto-scale-thumbnail' />
                        </TableCell>
                        <TableCell sx={{ maxWidth: '180px', minWidth: '150px' }}>
                            {item.name}
                        </TableCell>
                        <TableCell >
                            <Tooltip title={t('label_edit')}>
                                <EditIcon cursor={'pointer'} onClick={() => setEditing(item)} />
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
        {editing && <BrandEditorDialog
            data={editing}
            onClose={() => setEditing(null)} />}
    </Stack>
}