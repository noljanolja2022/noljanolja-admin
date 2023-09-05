import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import { t } from "i18next";
import { Image } from 'mui-image';
import { useEffect, useState } from "react";
import { User } from "../../data/model/UserModels";
import useUsersManager from "../../hook/useUsersManager";
import userService from "../../service/UserService";
import { useLoadingStore } from "../../store/LoadingStore";
import { parseDate } from "../../util/DateUtil";
import ConfirmDialog from "../widget/ConfirmDialog";
import { Box, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "../widget/mui";
import UserFilter from "./UserFilter";
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
            <Box>
                <UserFilter />
            </Box>
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
                                        <Tooltip title={t('label_deactive')}>
                                            <IconButton onClick={() => onUpdateStatus(item)}><LockIcon /></IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title={t('label_activate')}>
                                            <IconButton onClick={() => onUpdateStatus(item)}><LockOpenIcon /></IconButton>
                                        </Tooltip>}
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