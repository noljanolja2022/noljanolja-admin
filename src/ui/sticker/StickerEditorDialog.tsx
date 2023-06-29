import { t } from "i18next";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Tooltip, Typography } from "../widget/mui";
import { Sticker, StickerPack } from "../../data/model/StickerModels";
import { useEffect, useState } from "react";
import mediaService from "../../service/MediaService";
import { useLoadingStore } from "../../store/LoadingStore";
import { responseToBase64Img } from "../../util/StringUtils";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AxiosResponse } from "axios";

type Props = {
    data: Partial<StickerPack>;
    onClose: () => void;
}
const fileTypes = ["zip", "7z"];

export default function StickerEditorDialog({ data, onClose }: Props) {
    const [stickerImgs, setStickerImgs] = useState<Record<string, Sticker>>({});
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const isUpdating = data.id != null;
    const [file, setFile] = useState<Nullable<File>>(null);
    const handleChange = (file: any) => {
        setFile(file);
    };

    useEffect(() => {
        if (isUpdating) {
            loadStickerImages();
        }
    }, [])

    const loadStickerImages = async () => {
        setLoading()
        try {
            const jobs: Promise<AxiosResponse<any, any>>[] = [];
            data.stickers?.forEach(sticker => {
                jobs.push(mediaService.getStickerUrl(data.id!, sticker.imageFile))
            })
            const settledJobs = await Promise.allSettled(jobs);
            const tmp: Record<string, Sticker> = {};
            settledJobs.forEach((e, i) => {
                if (e.status == 'fulfilled') {
                    tmp[data.stickers![i].imageFile] = {
                        imageFile: responseToBase64Img(e.value),
                        emojis: data.stickers![i].emojis
                    }
                }
            })
            setStickerImgs(tmp)
        } catch (e) {
            console.log(e)
        }
        setIdle();
    }

    const onUploadFile = () => {
        if (!file) {
            return;
        }
        setLoading()
        mediaService.createStickerPack(file).then(res => {
            if (res.isFailure()) {
                showErrorNoti('Uploaded Failured')
                return;
            }
            showSuccessNoti("Sticker created successfully")
            onClose();
        }).catch(e => {
            showErrorNoti(`Upload failed. ${e}`)
        }).finally(() => {
            setIdle()
        })
    }


    return (
        <Dialog open fullWidth maxWidth="md">
            <DialogTitle>{isUpdating ? "Sticker Detail" : "Create sticker"}</DialogTitle>
            <DialogContent>

                {isUpdating
                    ?
                    <Box>
                        <Box display={'flex'} gap={2}>
                            <Box>
                                <Typography variant="h4">{data.name}</Typography>
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                                    Publisher:<Typography variant="h5">{data.publisher}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box display={'flex'} gap={2} flexWrap={'wrap'}>
                            {Object.keys(stickerImgs).map((e, i) =>
                                <Tooltip title={stickerImgs[e].emojis.join(",")}>
                                    <img key={e} src={stickerImgs[e].imageFile}
                                        alt={e}
                                        style={{
                                            width: 80,
                                            height: 80,
                                        }} />
                                </Tooltip>

                            )
                            }
                        </Box>
                    </Box>
                    :
                    <Box padding={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        {/* Upload a zipped file to create a new sticker pack */}
                        <FileUploader handleChange={handleChange}
                            name="sticker file"
                            fileOrFiles={file}
                            types={fileTypes} required >
                            <Box
                                sx={{
                                    cursor: 'pointer',
                                    border: 'dotted'
                                }}
                                maxHeight={200}
                                maxWidth={400}
                                p={4}
                                borderRadius={2}>
                                <Box textAlign={'center'}>
                                    {file ?
                                        <Typography>{file.name}</Typography>
                                        : <>
                                            <Typography><CloudUploadIcon /> Click to upload</Typography>
                                            <Typography>Or</Typography>
                                            <Typography>Drag zipped file here</Typography>
                                        </>
                                    }
                                </Box>

                            </Box>
                        </FileUploader>
                    </Box>
                }
            </DialogContent>
            <DialogActions>
                {file && <Button onClick={onUploadFile}>{t('label_add')}</Button>}
                {file && <Button color="error" onClick={() => { setFile(null) }}>Clear</Button>}
                <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
            </DialogActions>
        </Dialog>

    )
}