import { useTranslation } from "react-i18next";
import { Video } from "../../data/model/VideoModels";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, Menu, MenuItem, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, useTheme } from "./mui";
import { useEffect, useState } from "react";
import { VideoRewardConfig, VideoRewardConfigProgress } from "../../data/model/ConfigModels";
import rewardService from "../../service/RewardService";
import { useLoadingStore } from "../../store/LoadingStore";
import { parseDate } from "../../util/DateUtil";
import { theme } from "../../util/theme";
import { formatToDecimal, formatToInt } from "../../util/StringUtils";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InfoIcon from '@mui/icons-material/Info';

export type VideoSettingCardProps = {
    id?: number;
    videoId: string;
    isActive?: boolean;
    maxApplyTimes?: number;
    totalPoints?: number;
    rewardProgresses?: VideoRewardConfigProgress[]
}

type Props = {
    data: VideoSettingCardProps;
    onClose: () => void
}

export type ProgressProps = {
    id: any;
} & VideoRewardConfigProgress

export default function VideoSettingCard(props: Props) {
    const { t } = useTranslation();
    const theme = useTheme();
    const { setLoading, setIdle, viewState } = useLoadingStore();
    const [maxApplyTimes, setMaxApplyTimes] = useState(props.data.maxApplyTimes || 1);
    const [totalPoints, setTotalPoints] = useState(props.data.totalPoints || 0);
    const [isActive, setIsActive] = useState(props.data.isActive || false);
    const [milestones, setMilestones] = useState<ProgressProps[]>(
        props.data.rewardProgresses?.map(p => ({ ...p, id: Math.random() * 100 }))
        || [{ point: 50, progress: 0.5, id: 0 }]
    );


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

    const onSaveConfig = () => {
        const eligibleProgress: VideoRewardConfigProgress[] = milestones.filter(mileStone => mileStone.point != 0 && mileStone.progress != 0).map(e => ({
            point: e.point,
            progress: e.progress
        }))
        if (eligibleProgress.length == 0) {
            alert("Progress isn't right")
            return;
        }
        setLoading();

        rewardService.updateVideoRewardConfig(props.data.videoId, isActive, maxApplyTimes, eligibleProgress, totalPoints).then(res => {
            props.onClose();
        }).finally(() => {
            setIdle();
        })
    }

    return (
        <Dialog open={props.data.videoId != null} maxWidth={'md'}>
            <DialogTitle>Reward configuration</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ md: 2 }}>
                    <Grid item md={6}>
                        <Typography>Status</Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                    </Grid>
                    <Grid item md={6} display={'flex'} flexDirection={'row'} gap={1}>
                        <Typography>Maximum reward times</Typography>
                        <Tooltip title="The amounf of times user will be rewarded by watching full video">
                            <InfoIcon />
                        </Tooltip>
                    </Grid>
                    <Grid item md={6}>
                        <TextField id="input-point-reward"
                            size="small"
                            fullWidth={false}
                            required
                            inputMode="numeric"
                            value={maxApplyTimes}
                            error={maxApplyTimes < 0}
                            onChange={(event) => setMaxApplyTimes(formatToInt(event.target.value))} />
                    </Grid>
                    <Grid item md={6} display={'flex'} flexDirection={'row'} gap={1}>
                        <Typography>Total points</Typography>
                        <Tooltip title="The maximum points an user can gain in one reward cycle. **Set to 0 for automatic">
                            <InfoIcon />
                        </Tooltip>
                    </Grid>
                    <Grid item md={6}>
                        <TextField id="input-point-reward"
                            size="small"
                            fullWidth={false}
                            required
                            inputMode="numeric"
                            value={totalPoints}
                            error={totalPoints < 0}
                            onChange={(event) => setTotalPoints(formatToInt(event.target.value))}
                        />
                    </Grid>
                </Grid>
                <TableContainer sx={{
                    marginTop: 4
                }} component={Paper}>
                    <Table aria-label="video table">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ fontWeight: 700 }} >
                                    <Box display={'flex'} flexDirection={'row'} gap={0.5}>
                                        Milestone
                                        <Tooltip title="Indicate when an user will receive reward based on milestone. Value must be bigger than 0 and smaller and equal to 1">
                                            <InfoIcon />
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    <Box display={'flex'} flexDirection={'row'} gap={0.5}>
                                        Points
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
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onSaveConfig()}>{t('label_save')}</Button>
                <Button color="neutral" onClick={props.onClose}>{t('label_cancel')}</Button>
            </DialogActions>
        </Dialog >
    )
}

export function VideoRewardProgressInput(props: VideoRewardConfigProgress & {
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
                    value={props.progress}
                    error={props.progress < 0 || props.progress > 1}
                    onChange={(event) => props.onChangeProgress(formatToDecimal(event.target.value))}
                />
            </TableCell>
            <TableCell >
                <TextField
                    size="small"
                    fullWidth={false}
                    required
                    inputMode="numeric"
                    type="number"
                    value={props.point}
                    error={props.point < 0}
                    onChange={(event) => props.onChangePoint(formatToInt(event.target.value))}
                />
            </TableCell>
            <TableCell >
                <RemoveCircleIcon
                    onClick={props.onRemove}
                    sx={{
                        cursor: 'pointer',
                        color: 'red'
                    }} />
            </TableCell>
        </TableRow>
    )
}