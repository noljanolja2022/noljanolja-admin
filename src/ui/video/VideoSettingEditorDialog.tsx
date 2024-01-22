import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { VideoRewardConfig, VideoRewardConfigProgress, AccumulationConfigLog } from "../../data/model/ConfigModels";
import rewardService from "../../service/RewardService";
import { useLoadingStore } from "../../store/LoadingStore";
import { formatDateTimeToString, formatToDecimal, formatToInt, parseStringToDateTime } from "../../util/StringUtils";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, useTheme } from "../widget/mui";

type Props = {
    data: Partial<VideoRewardConfig>;
    onClose: () => void
}

export type ProgressProps = {
    id: any;
} & VideoRewardConfigProgress

export type AccumulationConfigLogProps = {
    id: any;
} & AccumulationConfigLog

interface FormProps {
    isActive: boolean;
    maxApplyTimes: number;
    totalPoints: number;
    minCommentLength: number;
    commentMaxApplyTimes: number;
    commentRewardPoints: number;
    likeMaxApplyTimes: number;
    likeRewardPoints: number;
}

export default function VideoSettingEditorDialog({ data, onClose }: Props) {
    const { t } = useTranslation();
    const theme = useTheme();
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const [milestones, setMilestones] = useState<ProgressProps[]>(
        data?.rewardProgresses?.map(p => ({ ...p, id: Math.random() * 100 }))
        || [{ point: 50, progress: 0.5, id: 0 }]
    );
    const [accummulatedConfigs, setAccummulatedConfigs] = useState<AccumulationConfigLogProps[]>(
        data?.accumulationConfigLog?.map(p => ({ ...p, id: Math.random() * 100})) 
        || []
    );

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        defaultValues: {
            isActive: data?.isActive || true,
            maxApplyTimes: data?.maxApplyTimes || 1,
            totalPoints: data?.totalPoints || 0,
            commentMaxApplyTimes: data?.commentMaxApplyTimes || 1,
            commentRewardPoints: data?.commentRewardPoints || 0,
            likeMaxApplyTimes: data?.likeMaxApplyTimes || 0,
            likeRewardPoints: data?.likeRewardPoints || 0,
            minCommentLength: data?.minCommentLength || 0
        }
    });

    const onChangeMileStoneTime = (index: number, data: number) => {
        const tmp = [...milestones]
        tmp[index].point = data;
        setMilestones(tmp)
    }

    const onChangeMileStonePoint = (index: number, data: number) => {
        const tmp = [...milestones]
        tmp[index].progress = data;
        setMilestones(tmp)
    }
    const onAddMileStone = () => {
        const tmp = [...milestones];
        tmp.push({ point: 0, progress: 0, id: Math.random() * 100 })
        setMilestones(tmp)
    }

    const onRemoveMileStone = (item: ProgressProps) => {
        if (milestones.length <= 1) {
            return;
        }
        let tmp = [...milestones].filter(e => e.id != item.id)
        setMilestones(tmp)
    }

    const onChangeAccummulateConfigLogStartTime = (index: number, data: string) => {
        const tmp = [...accummulatedConfigs]
        tmp[index].startTime = data;
        setAccummulatedConfigs(tmp)
    }

    const onChangeAccummulateConfigLogPercentage = (index: number, data: number) => {
        const tmp = [...accummulatedConfigs]
        tmp[index].percentage = data;
        setAccummulatedConfigs(tmp)
    }

    const onAddAccummulateConfigLog = () => {
        const tmp = [...accummulatedConfigs];
        tmp.push({ startTime: formatDateTimeToString(new(Date)), percentage: 100, id: Math.random() * 100})
        setAccummulatedConfigs(tmp)
    }

    const onRemoveAccummulateConfigLog = (item: AccumulationConfigLogProps) => {
        if (accummulatedConfigs.length <= 1) {
            return;
        }
        let tmp = [...accummulatedConfigs].filter(e => e.id != item.id)
        setAccummulatedConfigs(tmp)
    }

    const onSaveConfig = (formInput: FormProps) => {
        const eligibleProgress: VideoRewardConfigProgress[] = milestones
            .filter(
                mileStone => mileStone.point != 0 && mileStone.progress != 0)
            .map(e => ({
                point: e.point,
                progress: e.progress / 100
            }))
        if (eligibleProgress.length == 0) {
            alert("Progress isn't right")
            return;
        }

        const eligibleAccummulatedConfigs: AccumulationConfigLog[] = accummulatedConfigs
            .filter(
                config => config.percentage >= 0 && config.percentage <= 100 && config.startTime.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/) != null)
            .map(e => ({
                percentage: e.percentage,
                startTime: e.startTime.replace(' ', 'T')
            }))

        console.log("eligibleAccummulatedConfigs: ", eligibleAccummulatedConfigs)  
        console.log("eligibleAccummulatedConfigsJSON:" , JSON.stringify(eligibleAccummulatedConfigs)) 
        setLoading();

        rewardService.updateVideoRewardConfig({
            videoId: data.videoId!,
            isActive: formInput.isActive,
            maxApplyTimes: formInput.maxApplyTimes,
            rewardProgresses: eligibleProgress,
            totalPoints: formInput.totalPoints,
            commentMaxApplyTimes: formInput.commentMaxApplyTimes,
            commentRewardPoints: formInput.commentRewardPoints,
            likeMaxApplyTimes: formInput.likeMaxApplyTimes,
            likeRewardPoints: formInput.likeRewardPoints,
            minCommentLength: formInput.minCommentLength,
            accumulationConfigLog: JSON.stringify(eligibleAccummulatedConfigs),
        }
        ).then(res => {
            if (res.isFailure()) {
                showErrorNoti(res.getErrorMsg())
                return;
            }
            showSuccessNoti('Update config successfully')
            onClose();
        }).finally(() => {
            setIdle();
        })
    }

    return (
        <Dialog open maxWidth={'md'}>
            <DialogTitle>Reward configuration</DialogTitle>
            <form onSubmit={handleSubmit(onSaveConfig)}>
                <DialogContent>
                    <Grid container justifyContent={'space-between'} rowSpacing={1} columnSpacing={{ md: 2 }}>
                        <Grid item md={6} display={'flex'} flexDirection={'column'} gap={2}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography>Status</Typography>
                                <Controller
                                    render={({ field: { ref, ...rest } }) =>
                                        <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />}
                                    control={control}
                                    name="isActive"
                                />
                            </Box>

                            <Controller
                                render={({ field: { ref, ...rest } }) =>
                                    <TextField
                                        label={t('label_max_reward_time')}
                                        size="small"
                                        fullWidth={false}
                                        required
                                        inputMode="numeric"
                                        value={rest.value}
                                        error={errors.maxApplyTimes?.message !== undefined}
                                        helperText={errors.maxApplyTimes?.message}
                                        onChange={(event) => rest.onChange(formatToInt(event.target.value))} />
                                }
                                control={control}
                                name="maxApplyTimes"
                            />
                            <Controller
                                render={({ field: { ref, ...rest } }) =>
                                    <TextField
                                        label="Total points gained for watching"
                                        size="small"
                                        fullWidth={false}
                                        required
                                        inputMode="numeric"
                                        value={rest.value}
                                        error={errors.totalPoints?.message !== undefined}
                                        helperText={errors.totalPoints?.message}
                                        onChange={(event) => rest.onChange(formatToInt(event.target.value))} />
                                }
                                control={control}
                                name="totalPoints"
                            />

                        </Grid>

                        <Grid item md={6} display={'flex'} flexDirection={'column'} gap={2}>
                            <Controller
                                render={({ field: { ref, ...rest } }) =>
                                    <TextField
                                        label="Maximum reward times for commenting"
                                        size="small"
                                        fullWidth={false}
                                        required
                                        inputMode="numeric"
                                        value={rest.value}
                                        error={errors.commentMaxApplyTimes?.message !== undefined}
                                        helperText={errors.commentMaxApplyTimes?.message}
                                        onChange={(event) => rest.onChange(formatToInt(event.target.value))} />
                                }
                                control={control}
                                name="commentMaxApplyTimes"
                            />
                            <Controller
                                render={({ field: { ref, ...rest } }) =>
                                    <TextField
                                        label="Points rewarded for commenting"
                                        size="small"
                                        fullWidth={false}
                                        required
                                        inputMode="numeric"
                                        value={rest.value}
                                        error={errors.commentRewardPoints?.message !== undefined}
                                        helperText={errors.commentRewardPoints?.message}
                                        onChange={(event) => rest.onChange(formatToInt(event.target.value))} />
                                }
                                control={control}
                                name="commentRewardPoints"
                            />
                            <Controller
                                render={({ field: { ref, ...rest } }) =>
                                    <TextField
                                        label="Maximum reward times for like"
                                        size="small"
                                        fullWidth={false}
                                        required
                                        inputMode="numeric"
                                        value={rest.value}
                                        error={errors.likeMaxApplyTimes?.message !== undefined}
                                        helperText={errors.likeMaxApplyTimes?.message}
                                        onChange={(event) => rest.onChange(formatToInt(event.target.value))} />
                                }
                                control={control}
                                name="likeMaxApplyTimes"
                            />
                            <Controller
                                render={({ field: { ref, ...rest } }) =>
                                    <TextField
                                        label="Reward points for like"
                                        size="small"
                                        fullWidth={false}
                                        required
                                        inputMode="numeric"
                                        value={rest.value}
                                        error={errors.likeRewardPoints?.message !== undefined}
                                        helperText={errors.likeRewardPoints?.message}
                                        onChange={(event) => rest.onChange(formatToInt(event.target.value))} />
                                }
                                control={control}
                                name="likeRewardPoints"
                            />
                            <Controller
                                render={({ field: { ref, ...rest } }) =>
                                    <TextField
                                        label="Minimum comment length"
                                        size="small"
                                        fullWidth={false}
                                        required
                                        inputMode="numeric"
                                        value={rest.value}
                                        error={errors.minCommentLength?.message !== undefined}
                                        helperText={errors.minCommentLength?.message}
                                        onChange={(event) => rest.onChange(formatToInt(event.target.value))} />
                                }
                                control={control}
                                name="minCommentLength"
                            />
                        </Grid>
                    </Grid>

                    <TableContainer sx={{
                        marginTop: 4
                    }} >
                        <Table aria-label="video table">
                            <TableHead>
                                <TableRow >
                                    <TableCell >
                                        <Box display={'flex'} flexDirection={'row'} gap={0.5}>
                                            {t('label_milestone')}
                                            <Tooltip title="Indicate when an user will receive reward based on milestone. Value must be bigger than 0 and smaller and equal to 100">
                                                <InfoIcon />
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box display={'flex'} flexDirection={'row'} gap={0.5}>
                                            {t('label_points')}
                                            <Tooltip title="Total points received each milestone. The later must be bigger than the former">
                                                <InfoIcon />
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                    <TableCell ><AddCircleIcon onClick={() => onAddMileStone()} sx={{
                                        cursor: 'pointer',
                                        color: theme.palette.primary.main
                                    }} /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {milestones.map((mileStone, index) =>
                                    <VideoRewardProgressInput key={mileStone.id}
                                        point={mileStone.point}
                                        onChangeProgress={(data) => onChangeMileStonePoint(index, data)}
                                        onChangePoint={(data) => onChangeMileStoneTime(index, data)}
                                        onRemove={() => onRemoveMileStone(mileStone)}
                                        progress={mileStone.progress} />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer sx={{
                        marginTop: 4
                    }} >
                        <Table aria-label="video table">
                            <TableHead>
                                <TableRow >
                                    <TableCell >
                                        <Box display={'flex'} flexDirection={'row'} gap={0.5}>
                                            {t('label_start_time')}
                                            <Tooltip title="Start time is a time when user can received percentage points">
                                                <InfoIcon />
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box display={'flex'} flexDirection={'row'} gap={0.5}>
                                            {t('label_percentage')}
                                            <Tooltip title="Percentage point will be received after start time. Value must in range (0 - 100)">
                                                <InfoIcon />
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                    <TableCell ><AddCircleIcon onClick={() => onAddAccummulateConfigLog()} sx={{
                                        cursor: 'pointer',
                                        color: theme.palette.primary.main
                                    }} /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {accummulatedConfigs.map((config, index) =>
                                    <AccumulationConfigLogInput key={config.id}
                                        startTime={config.startTime}
                                        onChangePercentage={(data) => onChangeAccummulateConfigLogPercentage(index, data)}
                                        onChangeStartTime={(data) => onChangeAccummulateConfigLogStartTime(index, data)}
                                        onRemove={() => onRemoveAccummulateConfigLog(config)}
                                        percentage={config.percentage} />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">{t('label_save')}</Button>
                    <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export function VideoRewardProgressInput({ progress, point, onChangePoint, onChangeProgress, onRemove }: VideoRewardConfigProgress & {
    onChangePoint: (newPoint: number) => void,
    onChangeProgress: (newProgress: number) => void,
    onRemove: () => void
}) {
    return (
        <TableRow>
            <TableCell >
                <TextField
                    size="small"
                    fullWidth={false}
                    required
                    inputMode="decimal"
                    type="number"
                    value={progress}
                    error={progress < 0 || progress > 100}
                    onChange={(event) => onChangeProgress(formatToInt(event.target.value))}
                />
            </TableCell>
            <TableCell >
                <TextField
                    size="small"
                    fullWidth={false}
                    required
                    inputMode="numeric"
                    type="number"
                    value={point}
                    error={point < 0}
                    onChange={(event) => onChangePoint(formatToInt(event.target.value))}
                />
            </TableCell>
            <TableCell >
                <RemoveCircleIcon
                    onClick={onRemove}
                    sx={{
                        cursor: 'pointer',
                        color: 'red'
                    }} />
            </TableCell>
        </TableRow>
    )
}

export function AccumulationConfigLogInput({ startTime, percentage, onChangeStartTime, onChangePercentage, onRemove }: AccumulationConfigLog & {
    onChangeStartTime: (startTime: string) => void,
    onChangePercentage: (percentage: number) => void,
    onRemove: () => void
}) {
    return (
        <TableRow>
            <TableCell >
                <TextField
                    size="small"
                    fullWidth={false}
                    required
                    inputMode="text"
                    type="text"
                    error={startTime.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/) === null}
                    value={startTime}
                    onChange={(event) => onChangeStartTime(event.target.value)}
                />
            </TableCell>
            <TableCell >
                <TextField
                    size="small"
                    fullWidth={false}
                    required
                    inputMode="numeric"
                    type="number"
                    value={percentage}
                    error={percentage < 0 || percentage > 100}
                    onChange={(event) => onChangePercentage(formatToInt(event.target.value))}
                />
            </TableCell>
            <TableCell >
                <RemoveCircleIcon
                    onClick={onRemove}
                    sx={{
                        cursor: 'pointer',
                        color: 'red'
                    }} />
            </TableCell>
        </TableRow>
    )
}