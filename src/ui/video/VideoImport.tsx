import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import useVideoManager from "../../hook/useVideoManager";
import mediaService from "../../service/MediaService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField, Typography } from "../widget/mui";

interface ImportFormProps {
    url: string;
    isHighlight: boolean;
    availableFrom: string;
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
        if (data.availableFrom.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/) === null) {
            control.setError("root", { message: 'Date format is invalid' })
            return;
        }
        setLoading()
        mediaService.importVideo(data.url, data.isHighlight, data.availableFrom).then(res => {
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
                                    />
                            )}
                            control={control}
                            name="availableFrom"
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