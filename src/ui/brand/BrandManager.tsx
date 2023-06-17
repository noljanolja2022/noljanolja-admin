import { useEffect, useState } from "react";
import useBrandManager from "../../hook/useBrandManager";
import { Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "../widget/mui";
import { t } from "i18next";
import AddIcon from '@mui/icons-material/Add';
import BrandEditorDialog from "./BrandEditorDialog";
import { GiftBrand } from "../../data/model/Gift";

export default function BrandManager() {
    const { brands, fetchBrands, currentPage, setCurrentPage, totalPage } = useBrandManager();
    const [editingItem, setEditingItem] = useState<Nullable<GiftBrand>>(null);

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        fetchBrands()
    }, [currentPage])

    return <Stack spacing={1} p={2}>
        <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
            <Button onClick={() => setEditingItem({
                id: -1,
                image: '',
                name: ''
            })}>
                <AddIcon />
                {t('label_add')}
            </Button>
        </Box>
        <Table sx={{ maxWidth: 550 }}>
            <TableHead>
                <TableRow >
                    <TableCell>Image</TableCell>
                    <TableCell sx={{ maxWidth: '300px', fontWeight: 700 }}>{t('label_name')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {brands.map(item =>
                    <TableRow key={item.id}
                        onClick={() => setEditingItem(item)}
                        sx={{
                            cursor: 'pointer'
                        }}>
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
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
        {editingItem && <BrandEditorDialog
            data={editingItem}
            onClose={() => setEditingItem(null)} />}
    </Stack>
}