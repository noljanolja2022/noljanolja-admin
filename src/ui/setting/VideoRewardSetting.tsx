import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoadingStore } from "../../store/LoadingStore";
import { zeroOrHigher } from "../../util/StringUtils"
import { theme } from "../../util/theme"
import { Button, Grid, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, useTheme } from "../widget/mui"
import { ProgressProps, VideoRewardProgressInput } from "../widget/VideoSettingCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import rewardService from "../../service/RewardService";
import { VideoRewardConfigProgress } from "../../data/model/ConfigModels";
import { Box } from "@mui/material";
import { ViewState } from "../../data/enum/ViewState";

export default function VideoRewardSetting() {
    const { t } = useTranslation();
    const theme = useTheme();
    const { setIniting, setLoading, setIdle, viewState } = useLoadingStore();
    const [maxApplyTimes, setMaxApplyTimes] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [milestones, setMilestones] = useState<ProgressProps[]>([{ point: 0, progress: 0, id: 0 }]);

    useEffect(() => {
        setIniting();
        rewardService.getVideoRewardConfig("global").then(res => {
            if (res.isFailure()) {
                console.log(res.error?.message)
                return;
            }
            if (res.data != null) {
                setIsActive(res.data.isActive);
                setMaxApplyTimes(res.data.maxApplyTimes);
                setMilestones(res.data.rewardProgresses?.map(p => ({ ...p, id: Math.random() * 100 })))
            }
        }).finally(() => {
            setIdle();
        })
    }, [])

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
        console.log(item)
        let tmp = [...milestones].filter(e => e.id != item.id)
        console.log(tmp)
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

        rewardService.updateVideoRewardConfig("", isActive, maxApplyTimes, eligibleProgress).then(res => {

        }).finally(() => {
            setIdle();
        })
    }

    if (viewState == ViewState.INITING) {
        return null
    }

    return <Stack p={2} gap={2}>
        <Paper sx={{ p: 2 }}>
            <Grid container rowSpacing={1} columnSpacing={{ md: 2 }}>
                <Grid item md={6}>
                    <Tooltip title="Is this setting activated">
                        <Typography>Status</Typography>
                    </Tooltip>
                </Grid>
                <Grid item md={6}>
                    <Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />

                </Grid>
                <Grid item md={6}>
                    <Tooltip title="The amounf of times user will be rewarded by watching full video">
                        <Typography>Maximum reward times</Typography>
                    </Tooltip>
                </Grid>
                <Grid item md={6}>
                    <TextField id="input-point-reward"
                        size="small"
                        sx={{
                            width: 200
                        }}
                        fullWidth={false}
                        required
                        inputMode="numeric"
                        value={maxApplyTimes}
                        error={maxApplyTimes < 0}
                        onChange={(event) => setMaxApplyTimes(zeroOrHigher(event.target.value))} />
                </Grid>
            </Grid>


            <TableContainer sx={{
                marginTop: 4
            }} component={Paper}>
                <Table aria-label="video table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: 700 }}>Milestone</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Points</TableCell>
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
            <Button sx={{marginTop: 4}} onClick={() => onSaveConfig()}>{t('label_save')}</Button>

        </Paper>
    </Stack>
}