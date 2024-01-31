import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import useVideoManager from "../../hook/useVideoManager";
import mediaService from "../../service/MediaService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField, Typography } from "../widget/mui";
import { formatDateTimeToString } from "../../util/StringUtils";

interface ImportFormProps {
    url: string;
    isHighlight: boolean;
    availableFrom: string;
    availableTo: string;
}

type Props = {
    onClose: () => void
}

export function VideoImport(props: Props) {
    const { setLoading, setIdle } = useLoadingStore();
    const {fetch} = useVideoManager();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ImportFormProps>({
        // resolver: yupResolver(LoginSchemaValidator),
    });

    const onImportVideo = (data: ImportFormProps) => {
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

        mediaService.importVideo(data.url, data.isHighlight, false, data.availableFrom, data.availableTo).then(res => {
            if (res.isFailure()) {
                control.setError("root", { message: res.getErrorMsg() })
                return;
            }
            control.setError("root", { message: `Imported success for video Id ${res.data?.id}` })
            setValue("url", '');
        }).finally(() => {
            setIdle()
            fetch()
        })
    }

    return (
        <Dialog open>
            <DialogTitle>Import video via Url</DialogTitle>
            <form onSubmit={handleSubmit(onImportVideo)} >
                <DialogContent>
                    <Box gap={1} display={"flex"} flexDirection={"column"} p={2} width={360}>
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={t('hint_enter_youtube_url')} required />
                            )}
                            control={control}
                            name="url"
                            defaultValue=""
                        />
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
                            defaultValue={formatDateTimeToString(new Date())}
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
                            defaultValue=""
                        />
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography>Is Highlighted:</Typography>
                            <Controller
                                render={({ field: { ref, ...rest } }) => (
                                    <Switch {...rest} />
                                )}
                                control={control}
                                name="isHighlight"
                                defaultValue={false}
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
                    <Button type="submit" >{t('label_add')}</Button>
                    <Button color="neutral" onClick={props.onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}