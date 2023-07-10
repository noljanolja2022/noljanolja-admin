import { useEffect, useState } from "react";
import { StickerPack } from "../../data/model/StickerModels";
import { useLoadingStore } from "../../store/LoadingStore";
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "../widget/mui";
import mediaService from "../../service/MediaService";
import AddIcon from '@mui/icons-material/Add';
import { t } from "i18next";
import StickerEditorDialog from "./StickerEditorDialog";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { AxiosResponse } from "axios";
import { responseToBase64Img } from "../../util/StringUtils";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';

export default function StickerManager() {
    const { t } = useTranslation();
    const { setLoading, setIdle, viewState } = useLoadingStore();

    const [data, setData] = useState<StickerPack[]>([]);
    const [stickerDetail, setStickerDetail] = useState<Nullable<Partial<StickerPack>>>(null);

    const fetchSticker = async () => {
        setLoading()
        try {
            const res = await mediaService.getStickerPacks()
            if (res.isFailure()) {
                console.log(res.getErrorMsg);
                return;
            }
            const stickerPacks = res.data || []
            const jobs: Promise<AxiosResponse<any, any>>[] = [];
            stickerPacks.forEach(sp => {
                jobs.push(mediaService.getStickerUrl(sp.id, sp.trayImageFile))
            })
            const settledJobs = await Promise.allSettled(jobs);
            settledJobs.forEach((e, i) => {
                if (e.status == 'fulfilled') {
                    stickerPacks[i].trayImageFile = responseToBase64Img(e.value);
                }
            })
            setData(stickerPacks);
        } catch (e) {
            console.log(e)
        }
        setIdle()
    }

    useEffect(() => {
        fetchSticker();
    }, [])

    return (
        <Stack spacing={1} p={2}>
            <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
                {/* <TextField  sx={{
                    width: '300px',
                }} /> */}
                <Button onClick={() => setStickerDetail({})}><AddIcon />{t('label_add')}</Button>
            </Box>
            <TableContainer>
                <Table sx={{ maxWidth: 650 }} aria-label="video table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('label_thumbnail')}</TableCell>
                            <TableCell >{t('label_name')}</TableCell>
                            <TableCell >{t('label_publisher')}</TableCell>
                            <TableCell >{t('label_is_animated')}</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item =>
                            <TableRow key={item.id}>
                                <TableCell align="left" sx={{ width: 100 }} >
                                    <img src={item.trayImageFile}
                                        alt={item.name}
                                        className='auto-scale-thumbnail' />
                                </TableCell>
                                <TableCell >{item.name}</TableCell>
                                <TableCell >{item.publisher}</TableCell>
                                <TableCell >{item.isAnimated ? <CheckIcon color="success" /> : <CloseIcon color="error" />}</TableCell>
                                <TableCell >
                                    <Tooltip title={t('label_edit')}>
                                        <EditIcon cursor={'pointer'} onClick={() => setStickerDetail(item)} />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )}
                        {/* {data.length == 0 && viewState != ViewState.LOADING &&
                            <TableRow sx={{
                                padding: theme.spacing(1)

                            }}>
                                No Sticker available. Please Import them first
                            </TableRow>} */}
                    </TableBody>
                </Table>
            </TableContainer>
            {stickerDetail && <StickerEditorDialog data={stickerDetail} onClose={() => setStickerDetail(null)} />}
        </Stack>
    )
}