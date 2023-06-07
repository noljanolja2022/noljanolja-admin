import { useState, FormEvent } from "react";
import mediaService from "../../service/MediaService";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Paper, Switch, TextField, Typography } from "../widget/mui";
import { t } from "i18next";
import { useLoadingStore } from "../../store/LoadingStore";
import { Controller, useForm } from "react-hook-form";
import useVideoManager from "../../hook/useVideoManager";

interface ImportFormProps {
    url: string;
    isHighlight: boolean;
}

type Props = {
    onClose: () => void
}

export function VideoImport(props: Props) {
    const { setLoading, setIdle } = useLoadingStore();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ImportFormProps>({
        // resolver: yupResolver(LoginSchemaValidator),
    });

    const onImportVideo = (data: ImportFormProps) => {
        setLoading()
        mediaService.importVideo(data.url, data.isHighlight).then(res => {
            if (res.isFailure()) {
                control.setError("root", { message: res.getErrorMsg() })
                return;
            }
            control.setError("root", { message: `Imported success for video Id ${res.data?.id}` })
            setValue("url", '');
        }).finally(() => {
            setIdle()
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
                    <Button type="submit" >Import</Button>
                    <Button color="neutral" onClick={props.onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}