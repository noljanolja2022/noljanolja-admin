import { useTranslation } from "react-i18next";
import { ChatRewardConfig, RoomType } from "../../data/model/ConfigModels";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "./mui";
import { useState } from "react";
import { formatToInt } from "../../util/StringUtils";
import rewardService from "../../service/RewardService";

type Props = {
    data: ChatRewardConfig | null,
    onClose: () => void
}

export default function ChatRewardCard({ data, onClose }: Props) {
    const { t } = useTranslation();
    const [roomType, setRoomType] = useState<RoomType>(data?.roomType || RoomType.SINGLE)
    const [isActive, setIsActive] = useState<boolean>(data?.isActive || true);
    const [onlyRewardCreator, setOnlyRewardCreator] = useState<boolean>(data?.onlyRewardCreator || true);
    const [maxApplyTimes, setMaxApplyTimes] = useState(data?.maxApplyTimes || 1);
    const [rewardPoint, setRewardPoint] = useState(data?.rewardPoint || 1);
    const [numberOfMessages, setNumberOfMessages] = useState(data?.numberOfMessages || 1);

    if (data == null) {
        return null;
    }
    const onSaveConfig = () => {
        rewardService.updateChatRewardConfig()
        onClose();
    }
    const onChangeRoomType = (
        event: React.MouseEvent<HTMLElement>,
        newType: RoomType,
    ) => {
        setRoomType(newType);
    };

    return <Dialog open >
        <DialogTitle>Chat configuration</DialogTitle>
        <DialogContent>
            <Grid container rowSpacing={1} columnSpacing={{ md: 1 }}>
                <Grid item md={6}>
                    <Typography>Status</Typography>
                </Grid>
                <Grid item md={6}>
                    <Switch
                        onChange={(e) => setIsActive(e.target.checked)}
                        checked={isActive} />
                </Grid>
                <Grid item md={6}>
                    <Typography>Room Type</Typography>
                </Grid>
                <Grid item md={6}>
                    <ToggleButtonGroup
                        size="small"
                        value={roomType}
                        exclusive
                        onChange={onChangeRoomType}
                        aria-label="Room Type switch">
                        <ToggleButton value={RoomType.SINGLE} >
                            <Typography color={'white'}>Single</Typography>
                        </ToggleButton>
                        <ToggleButton value={RoomType.GROUP} >
                            <Typography color={'white'}>Group</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>

                <Grid item md={6}>
                    <Tooltip title="The amounf of times user will be rewarded by watching full video">
                        <Typography>Maximum reward times</Typography>
                    </Tooltip>
                </Grid>
                <Grid item md={6}>
                    <TextField
                        size="small"
                        sx={{
                            width: 200
                        }}
                        fullWidth={false}
                        required
                        inputMode="numeric"
                        value={maxApplyTimes}
                        error={maxApplyTimes < 0}
                        onChange={(event) => setMaxApplyTimes(formatToInt(event.target.value))} />
                </Grid>
                <Grid item md={6}>
                    <Tooltip title="The amount of point rewarded to user">
                        <Typography>Point Reward</Typography>
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
                        value={rewardPoint}
                        error={rewardPoint < 0}
                        onChange={(event) => setRewardPoint(formatToInt(event.target.value))} />
                </Grid>
                <Grid item md={6}>
                    <Tooltip title="The amount of messages required to get rewarded">
                        <Typography>Message number</Typography>
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
                        value={numberOfMessages}
                        error={numberOfMessages < 0}
                        onChange={(event) => setNumberOfMessages(formatToInt(event.target.value))} />
                </Grid>
                <Grid item md={6}>
                    <Typography>Only reward creator</Typography>
                </Grid>
                <Grid item md={6}>
                    <Switch
                        onChange={(e) => setOnlyRewardCreator(e.target.checked)}
                        checked={onlyRewardCreator} />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onSaveConfig()}>{t('label_save')}</Button>
            <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
        </DialogActions>
    </Dialog>
}