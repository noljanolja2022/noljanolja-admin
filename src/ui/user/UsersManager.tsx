import { t } from "i18next";
import { Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "../widget/mui";
import UserEditorDialog from "./UserEditorDialog";
import { useEffect, useState } from "react";
import { User } from "../../data/model/UserModels";
import AddIcon from '@mui/icons-material/Add';
import useUsersManager from "../../hook/useUsersManager";
import { Image } from 'mui-image';
import EditIcon from '@mui/icons-material/Edit';
import { parseDate } from "../../util/DateUtil";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from "../widget/ConfirmDialog";
import { useLoadingStore } from "../../store/LoadingStore";
import userService from "../../service/UserService";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';

export default function UserManager() {
    const { setLoading, setIdle, showErrorNoti, showSuccessNoti } = useLoadingStore();
    const { users, totalPage, currentPage, setCurrentPage, fetch } = useUsersManager();
    // const [detail, setDetail] = useState<Nullable<Partial<User>>>(null);
    const [deletingUsr, setDelUsr] = useState<Nullable<User>>(null);

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const onDeleteUser = () => {
        setLoading()
        userService.deleteUser(deletingUsr!.id).then(res => {
            if (res.isFailure()) {
                showErrorNoti(res.getErrorMsg())
                return;
            }
            showSuccessNoti('User deleted successfully');
            setDelUsr(null)
            fetch();
        }).finally(() => {
            setIdle();
        })
    }

    const onUpdateStatus = (data: User) => {
        setLoading()
        userService.setUserActiveStatus(data.id, !data.isActive).then(res => {
            if (res.isFailure()) {
                showErrorNoti(res.getErrorMsg())
                return;
            }
            showSuccessNoti('User updated successfully');
            setDelUsr(null)
            fetch();
        }).finally(() => {
            setIdle();
        })
    }

    useEffect(() => {
        fetch('');
    }, [currentPage])

    return (
        <Stack spacing={1} p={2}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
                <Button onClick={() => setDetail({})}><AddIcon />{t('label_add')}</Button>
            </Box> */}
            <TableContainer>
                <Table aria-label="video table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('label_thumbnail')}</TableCell>
                            <TableCell >{t('label_name')}</TableCell>
                            <TableCell >{t('label_phone')}</TableCell>
                            <TableCell >{t('label_email')}</TableCell>
                            <TableCell >{t('label_gender')}</TableCell>
                            <TableCell >{t('label_dob')}</TableCell>
                            <TableCell >{t('label_status')}</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(item =>
                            <TableRow key={item.id} >
                                <TableCell align="left" sx={{ width: 100, height: 100 }} >
                                    <Image src={item.avatar || 'placeholder_avatar.png'} showLoading
                                        alt={item.avatar || `avatar-${item.id}`}
                                        className='auto-scale-thumbnail'
                                        style={{
                                            borderRadius: 4
                                        }} />
                                </TableCell>
                                <TableCell >{item.name}</TableCell>
                                <TableCell >{item.phone}</TableCell>
                                <TableCell >{item.email}</TableCell>
                                <TableCell >{item.gender}</TableCell>
                                <TableCell >{parseDate(item.dob)}</TableCell>
                                <TableCell >{item.isActive ? <CheckIcon color="success" /> : <CloseIcon color="error" />}</TableCell>
                                <TableCell >
                                    {item.isActive
                                        ?
                                        <Tooltip title={'Deactivate'}>
                                            <LockIcon cursor={'pointer'} onClick={() => onUpdateStatus(item)} />
                                        </Tooltip>
                                        :
                                        <Tooltip title={'Activate'}>
                                            <CheckCircleIcon cursor={'pointer'} onClick={() => onUpdateStatus(item)} />
                                        </Tooltip>}

                                    {/* <Tooltip title={t('label_delete')}>
                                        <DeleteIcon cursor={'pointer'} onClick={() => setDelUsr(item)} />
                                    </Tooltip> */}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
            {/* {detail && <UserEditorDialog data={detail} onClose={() => setDetail(null)} />} */}
            <ConfirmDialog
                onSubmit={onDeleteUser}
                onClose={() => setDelUsr(null)}
                visible={deletingUsr != null}>
                <Box>Are you sure you want to delete user <Typography display={'inline'} fontWeight={700}>{deletingUsr?.name}</Typography>?</Box>
            </ConfirmDialog>
        </Stack>
    )
}