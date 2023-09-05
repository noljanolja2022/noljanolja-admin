import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import rewardService from "../../service/RewardService";
import { useLoadingStore } from "../../store/LoadingStore";
import yup from "../../util/FormValidator";
import { formatToInt } from "../../util/StringUtils";
import { Box, Button, Stack, TextField } from "../widget/mui";


type FormProps = {
    refereePoints: number;
    refererPoints: number;
}

const schema = yup.object<FormProps, any>({
    refereePoints: yup.number().min(0, 'Number must be greater than 0').required(),
    refererPoints: yup.number().min(0, 'Number must be greater than 0').required()
});

function ReferrerManager() {
    const { setLoading, setIdle, showErrorNoti, showSuccessNoti } = useLoadingStore();
    const { t } = useTranslation();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        defaultValues: {
            refereePoints: 0,
            refererPoints: 0
        },
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        setLoading();
        rewardService.getReferralConfig().then(res => {
            if (res.isFailure()) {
                showErrorNoti(res.getErrorMsg())
                return;
            }
            const data = res.data;
            setValue("refereePoints", data?.refereePoints || 0);
            setValue("refererPoints", data?.refererPoints || 0);
        }).finally(() => {
            setIdle();
        })
    }, [])

    const onUpdate = async (fi: FormProps) => {
        setLoading();
        rewardService.updateReferralConfig(fi.refereePoints, fi.refererPoints).then(res => {
            if (res.isFailure()) {
                showErrorNoti(res.getErrorMsg())
                return;
            }
            showSuccessNoti('Updated successfully')
        }).finally(() => {
            setIdle();
        })
    }

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit(onUpdate)}>
                <Stack gap={2} maxWidth={400}>
                    <Controller render={({ field: { ref, ...rest } }) => (
                        <TextField {...rest}
                            fullWidth
                            inputMode="numeric"
                            label={t('hint_enter_referee_points')}
                            onChange={(event) => rest.onChange(formatToInt(event.target.value))}
                            error={errors.refereePoints?.message !== undefined}
                            helperText={errors.refereePoints?.message} />
                    )}
                        name="refereePoints"
                        control={control}
                    />
                    <Controller render={({ field: { ref, ...rest } }) => (
                        <TextField {...rest}
                            fullWidth
                            inputMode="numeric"
                            label={t('hint_enter_referer_points')}
                            onChange={(event) => rest.onChange(formatToInt(event.target.value))}
                            error={errors.refererPoints?.message !== undefined}
                            helperText={errors.refererPoints?.message} />
                    )}
                        name="refererPoints"
                        control={control}
                    />
                    <Button type="submit">{t('label_save')}</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default ReferrerManager;