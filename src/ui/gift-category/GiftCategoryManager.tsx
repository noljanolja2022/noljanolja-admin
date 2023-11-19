import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GiftCategory } from "../../data/model/Gift";
import useGiftCategoryManager from '../../hook/useGiftCategory';
import { Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "../widget/mui";
import EditorDialog from './Editor';
import Filter from './Filter';


export default function GiftCategoryManager() {
    const { t } = useTranslation();
    const { categories, fetch, currentPage, setCurrentPage, totalPage } = useGiftCategoryManager();
    const [editing, setEditing] = useState<Nullable<Partial<GiftCategory>>>(null);

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        fetch()
    }, [currentPage])

    return <Stack spacing={1} p={2}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'between', alignItems: 'center' }}>
            <Filter />
            <Button onClick={() => setEditing({})} startIcon={<AddIcon />}>
                {t('label_add')}
            </Button>
        </Box>

        <Table sx={{ maxWidth: 550 }}>
            <TableHead>
                <TableRow >
                    {/* <TableCell>{t('label_thumbnail')}</TableCell> */}
                    <TableCell sx={{ maxWidth: '300px' }}>{t('label_name')}</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {categories.map(item =>
                    <TableRow key={item.id}>
                        {/* <TableCell align="left" sx={{ width: 100, height: 100 }} >
                            <img src={item.image} alt={item.name} className='auto-scale-thumbnail' />
                        </TableCell> */}
                        <TableCell sx={{ maxWidth: '180px', minWidth: '150px' }}>
                            {item.name}
                        </TableCell>
                        <TableCell >
                            <Tooltip title={t('label_edit')}>
                                <IconButton onClick={() => setEditing(item)}><EditIcon /></IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
        {editing && <EditorDialog
            data={editing}
            onClose={() => setEditing(null)} />}
    </Stack>
}