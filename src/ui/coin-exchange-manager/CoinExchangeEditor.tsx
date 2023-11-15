import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import rewardService from "../../service/RewardService";
import { useLoadingStore } from "../../store/LoadingStore";
import { formatToDecimal, formatToInt } from "../../util/StringUtils";
import { Button, Stack, TextField } from "../widget/mui";

type FieldProps = {
    point: number;
    coin: number;
    rewardRecurringAmount: number;
}

export default function CoinExchangeEditor() {
    const { t } = useTranslation();
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();

    const { control, handleSubmit, setError, formState: { errors }, setValue } = useForm<FieldProps>({
        defaultValues: {
            point: 0,
            coin: 0,
            rewardRecurringAmount: 0
        }
    });

    useEffect(() => {
        setLoading();
        rewardService.getCoinExchangeConfig().then(res => {
            if (res.isFailure()) {
                showErrorNoti("Unable to fetch coin exchange config")
                return;
            }
            const data = res.data;
            setValue("point", data?.point ?? 0)
            setValue("coin", data?.coin ?? 0)
            setValue("rewardRecurringAmount", data?.rewardRecurringAmount || 0)
        }).finally(() => {
            setIdle();
        })
    }, [])

    const onUpdate = (formInput: FieldProps) => {
        setLoading();
        rewardService.updateCoinExchangeConfig(formInput.point, formInput.coin, formInput.rewardRecurringAmount).then(res => {
            if (res.isFailure()) {
                showErrorNoti("Unable to update coin exchange config")
                return;
            }
            showSuccessNoti("Update coin exchange config successfully")
        }).finally(() => {
            setIdle();
        })
    }

    return (
        <form onSubmit={handleSubmit(onUpdate)}>
            <Stack gap={2} maxWidth={300} mt={2}>
                <p>For every conversion made, user will be exchange x points to gain y coins</p>
                <Controller render={({ field: { ref, ...rest } }) => (
                    <TextField {...rest}
                        inputMode="numeric"
                        label={t('Point used for each conversion')}
                        onChange={(event) => rest.onChange(formatToDecimal(event.target.value))}
                        error={errors.point?.message !== undefined}
                        helperText={errors.point?.message} />
                )}
                    name="point"
                    control={control}
                />
                <Controller render={({ field: { ref, ...rest } }) => (
                    <TextField {...rest}
                        inputMode="numeric"
                        label={t('Coin earned for each conversion')}
                        onChange={(event) => rest.onChange(formatToDecimal(event.target.value))}
                        error={errors.coin?.message !== undefined}
                        helperText={errors.coin?.message} />
                )}
                    name="coin"
                    control={control}
                />
                <p>This will force user to watch ad after every n point to coin conversion made</p>
                <Controller render={({ field: { ref, ...rest } }) => (
                    <TextField {...rest}
                        inputMode="numeric"
                        label={t('enter recurring to trade')}
                        onChange={(event) => rest.onChange(formatToInt(event.target.value))}
                        error={errors.rewardRecurringAmount?.message !== undefined}
                        helperText={errors.rewardRecurringAmount?.message} />
                )}
                    name="rewardRecurringAmount"
                    control={control}
                />
                <Button type="submit">{t('label_save')}</Button>
            </Stack>

        </form>
    )
}