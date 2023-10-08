import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PromotedVideoConfig, Video } from "../../data/model/VideoModels";
import mediaService from "../../service/MediaService";
import { useLoadingStore } from "../../store/LoadingStore";
import { getTodayDate } from "../../util/DateUtil";
import { formatToInt } from "../../util/StringUtils";
import { DateTimePickerInput } from "../widget/DateWidget";
import { Box, Button, Grid, Switch, TextField, Typography } from "../widget/mui";
import VideoSearchAutocomplete from "./VideoSearchAutocomplete";


interface FormProps {
    video: Video;
    autoPlay: boolean;
    autoLike: boolean;
    autoComment: boolean;
    autoSubscribe: boolean;
    startDate: Date;
    endDate: Date;
    interactionDelay: number;
}

export default function VideoPromotionEditor() {
    const { t } = useTranslation();
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const todayDate = getTodayDate()
    const today = dayjs(todayDate);
    const [promotedVideo, setPromotedVideo] = useState<PromotedVideoConfig>()
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        defaultValues: {
            autoPlay: true,
            autoLike: true,
            autoComment: true,
            autoSubscribe: true,
            interactionDelay: 0
        }
    });

    useEffect(() => {
        mediaService.getPromotedVideo().then(res => {
            if (res.data && (res.pagination?.total || 0) > 0) {
                setPromotedVideo(res.data[0])
            }
        });
    }, [])

    useEffect(() => {
        if (!promotedVideo) {
            return;
        }
        setValue('video', promotedVideo.video)
        setValue('autoPlay', promotedVideo.autoPlay)
        setValue('autoLike', promotedVideo.autoLike)
        setValue('autoComment', promotedVideo.autoComment)
        setValue('autoSubscribe', promotedVideo.autoSubscribe)
        setValue('startDate', promotedVideo.startDate)
        setValue('endDate', promotedVideo.endDate)
        setValue('interactionDelay', promotedVideo.interactionDelay)

    }, [promotedVideo])

    const onSaveConfig = (formInput: FormProps) => {
        setLoading();
        mediaService.promoteVideo(formInput.video, formInput.interactionDelay, formInput.startDate, formInput.endDate).then((res) => {
            showSuccessNoti('Promoted video successfully')
        }).catch((err) => {
            showErrorNoti(err)
        }).finally(() => {
            setIdle();
        })
    }

    return (
        <Box >
            <Box>Video Promotion configuration</Box>
            <Box sx={{
                minWidth: 500, width: '70vw'
            }}>
                <form onSubmit={handleSubmit(onSaveConfig)}>
                    <Grid container sx={{

                    }} rowSpacing={4}
                        alignItems="stretch"
                        columnSpacing={{ md: 8 }}>
                        <Grid item md={12} mt={4}>
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <VideoSearchAutocomplete data={rest.value} onSelect={rest.onChange} />
                            )}
                                name="video"
                                control={control}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography>{t('label_auto_play')}</Typography>
                                <Controller
                                    render={({ field: { ref, ...rest } }) =>
                                        <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />}
                                    control={control}
                                    name="autoPlay"
                                />
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography>{t('label_auto_like')}</Typography>
                                <Controller
                                    render={({ field: { ref, ...rest } }) =>
                                        <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />}
                                    control={control}
                                    name="autoLike"
                                />
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography>{t('label_auto_comment')}</Typography>
                                <Controller
                                    render={({ field: { ref, ...rest } }) =>
                                        <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />}
                                    control={control}
                                    name="autoComment"
                                />
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography>{t('label_auto_subscribe')}</Typography>
                                <Controller
                                    render={({ field: { ref, ...rest } }) =>
                                        <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />}
                                    control={control}
                                    name="autoSubscribe"
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6} sx={{
                            display: 'flex', flexDirection: 'column', gap: 2
                        }}>
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <DateTimePickerInput label={t('label_effective_date')}
                                    minDateTime={today}
                                    value={rest.value ? dayjs(rest.value) : null}
                                    onChange={(e) => e && rest.onChange(e.toDate())} />
                            )}
                                name="startDate"
                                control={control}
                            />
                            {errors.startDate?.message && <Typography color={'red'}>{errors.startDate?.message}</Typography>}
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <DateTimePickerInput label={t('label_expire_date')}
                                    minDateTime={today}
                                    value={rest.value ? dayjs(rest.value) : null}
                                    onChange={(e) => e && rest.onChange(e.toDate())} />
                            )}
                                name="endDate"
                                control={control}
                            />
                            {errors.endDate?.message && <Typography color={'red'}>{errors.endDate?.message}</Typography>}
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField label={t('Interaction delay in seconds')}
                                    required
                                    inputMode="numeric"
                                    value={rest.value}
                                    error={errors.interactionDelay?.message !== undefined}
                                    onChange={(event) => rest.onChange(formatToInt(event.target.value))} />
                            )}
                                name="interactionDelay"
                                control={control} />
                        </Grid>
                        <Grid item sx={{
                            display: 'flex', gap: 2
                        }}>
                            <Button type="submit">{t('label_save')}</Button>
                            {/* <Button color="neutral">{t('label_cancel')}</Button> */}
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </Box >
    )
}