import { useTranslation } from "react-i18next";
import { ChatRewardConfig, RoomType } from "../../data/model/ConfigModels";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Switch, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "../widget/mui";
import rewardService from "../../service/RewardService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Controller, useForm } from "react-hook-form";
import useChatRewardConfig from "../../hook/useChatRewardConfig";

type Props = {
    data: Nullable<ChatRewardConfig>,
    onClose: () => void
}

interface FormProps {
    roomType: RoomType;
    isActive: boolean;
    onlyRewardCreator: boolean;
    maxApplyTimes: number;
    rewardPoint: number;
    numberOfMessages: number;
}

export default function ChatConfigEditor({ data, onClose }: Props) {
    const { t } = useTranslation();
    const { setLoading, setIdle } = useLoadingStore();
    const { fetchChatConfig } = useChatRewardConfig();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            roomType: data?.roomType || RoomType.SINGLE,
            isActive: data?.isActive || false,
            onlyRewardCreator: data?.onlyRewardCreator || true,
            maxApplyTimes: data?.maxApplyTimes || 1,
            rewardPoint: data?.rewardPoint || 1,
            numberOfMessages: data?.numberOfMessages || 1
        }
    });
    if (data == null) {
        return null;
    }
    const onSaveConfig = (data: FormProps) => {
        setLoading()
        rewardService.updateChatRewardConfig(
            data.roomType, data.isActive, data.maxApplyTimes,
            data.onlyRewardCreator, data.rewardPoint,
            data.numberOfMessages).then(res => {
                onClose();
                fetchChatConfig();
            }).finally(() => {
                setIdle();
            })
    }

    return <Dialog open >
        <DialogTitle>Chat configuration</DialogTitle>
        <form onSubmit={handleSubmit(onSaveConfig)}>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ md: 1 }}>
                    <Grid item md={6} sm={12}>
                        <Typography>Status</Typography>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <Switch checked={rest.value} onChange={rest.onChange} />
                            )}
                            control={control}
                            name="isActive"
                        />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Typography>Room Type</Typography>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <ToggleButtonGroup
                                    disabled
                                    value={rest.value}
                                    onChange={(_, data) => {
                                        rest.onChange(data)
                                    }}
                                    size="small"
                                    exclusive>
                                    <ToggleButton value={RoomType.SINGLE} >
                                        <Typography color={'white'}>Single</Typography>
                                    </ToggleButton>
                                    <ToggleButton value={RoomType.GROUP} >
                                        <Typography color={'white'}>Group</Typography>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            )}
                            control={control}
                            name="roomType"
                        />
                    </Grid>

                    <Grid item md={6} sm={12}>
                        <Tooltip title="The amounf of times user will be rewarded by watching full video">
                            <Typography>Maximum reward times</Typography>
                        </Tooltip>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    size="small"
                                    sx={{
                                        width: 200
                                    }}
                                    fullWidth={false}
                                    required
                                    inputMode="numeric"
                                // error={maxApplyTimes < 0}
                                />
                            )}
                            control={control}
                            name="maxApplyTimes"
                        />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Tooltip title="The amount of point rewarded to user">
                            <Typography>Point Reward</Typography>
                        </Tooltip>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    size="small"
                                    sx={{
                                        width: 200
                                    }}
                                    fullWidth={false}
                                    required
                                    inputMode="numeric"
                                // error={maxApplyTimes < 0}
                                />
                            )}
                            control={control}
                            name="rewardPoint"
                        />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Tooltip title="The amount of messages required to get rewarded">
                            <Typography>Message number</Typography>
                        </Tooltip>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    size="small"
                                    sx={{
                                        width: 200
                                    }}
                                    fullWidth={false}
                                    required
                                    inputMode="numeric"
                                // error={maxApplyTimes < 0}
                                />
                            )}
                            control={control}
                            name="numberOfMessages"
                        />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Typography>Only reward creator</Typography>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Controller
                            render={({ field: { ref, ...rest } }) => (
                                <Switch checked={rest.value} onChange={rest.onChange} />
                            )}
                            control={control}
                            name="onlyRewardCreator"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button type="submit">{t('label_save')}</Button>
                <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
            </DialogActions>
        </form>
    </Dialog>
}