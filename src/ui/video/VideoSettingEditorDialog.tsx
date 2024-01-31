import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import useVideoManager from "../../hook/useVideoManager";
import mediaService from "../../service/MediaService";
import { Video } from "../../data/model/VideoModels";
import { useLoadingStore } from "../../store/LoadingStore";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField, Typography } from "../widget/mui";
import { formatDateTimeToString } from "../../util/StringUtils";

interface EditFormProps {
    url: string;
    isHighlight: boolean;
    availableFrom: string;
    availableTo: string;
    isDeactivated: boolean;
}

type Props = {
    data: Partial<Video>;
    onClose: () => void
}

export default function EditVideoSetting({data, onClose}: Props) {
    const { setLoading, setIdle } = useLoadingStore();
    const {fetch} = useVideoManager();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditFormProps>({
        defaultValues: {
            url: data?.url, 
            isHighlight: data?.isHighlighted || false,
            isDeactivated: data?.isDeactivated || false,
            availableFrom: (data?.availableFrom != null && formatDateTimeToString(data?.availableFrom)) || '',
            availableTo: (data?.availableTo != null && formatDateTimeToString(data?.availableTo)) || ''
        }
    });

    const onEditVideo = (data: EditFormProps) => {
        if (data.availableFrom !== '') {
            if (data.availableFrom.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/) === null) {
                control.setError("root", { message: '\'Available From\' format is invalid' })
                return;
            }
            data.availableFrom = data.availableFrom + ':00Z'
            data.availableFrom = data.availableFrom.replace(' ', 'T')
        } 
       
        if (data.availableTo !== '') {
            if (data.availableTo.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/) === null) {
                control.setError("root", { message: '\'Available To\' format is invalid' })
                return;
            }
            data.availableTo = data.availableTo + ':00Z'
            data.availableTo = data.availableTo.replace(' ', 'T')
        }
        setLoading()

        mediaService.importVideo(data.url, data.isHighlight, data.isDeactivated, data.availableFrom, data.availableTo).then(res => {
            if (res.isFailure()) {
                control.setError("root", { message: res.getErrorMsg() })
                return;
            }
            control.setError("root", { message: `Edit success for video Id ${res.data?.id}` })
            setValue("url", '');
        }).finally(() => {
            setIdle()
            fetch()
        })
    }

    return (
        <Dialog open>
            <DialogTitle>Edit video</DialogTitle>
            <form onSubmit={handleSubmit(onEditVideo)} >
                <DialogContent>
                    <Box gap={1} display={"flex"} flexDirection={"column"} p={2} width={360}>
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={t('hint_available_from')} 
                                    error={rest.value != '' && rest.value.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/) === null}
                                    />
                            )}
                            control={control}
                            name="availableFrom"
                        />
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={t('hint_available_to')} 
                                    error={rest.value != '' && rest.value.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/) === null}
                                    />
                            )}
                            control={control}
                            name="availableTo"
                        />
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography>Is Highlighted:</Typography>
                            <Controller
                                render={({ field: { ref, ...rest } }) => (
                                    <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />
                                )}
                                control={control}
                                name="isHighlight"
                            />
                        </Box>
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography>Is Deactivated:</Typography>
                            <Controller
                                render={({ field: { ref, ...rest } }) => (
                                    <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />
                                )}
                                control={control}
                                name="isDeactivated"
                            />
                        </Box>
                        {errors.root?.message &&
                            <Typography color={'red'}>
                                {errors.root?.message}
                            </Typography>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" >{t('label_save')}</Button>
                    <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}