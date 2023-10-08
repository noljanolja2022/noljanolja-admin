import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import rewardService from "../../service/RewardService";
import { useLoadingStore } from "../../store/LoadingStore";
import { formatToDecimal, formatToInt } from "../../util/StringUtils";
import { Button, Stack, TextField } from "../widget/mui";

type FieldProps = {
    coinToPointRate: number;
    rewardRecurringAmount: number;
}

export default function CoinExchangeEditor() {
    const { t } = useTranslation();
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();

    const { control, handleSubmit, setError, formState: { errors }, setValue } = useForm<FieldProps>({
        defaultValues: {
            coinToPointRate: 0,
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
            setValue("coinToPointRate", data?.coinToPointRate || 0)
            setValue("rewardRecurringAmount", data?.rewardRecurringAmount || 0)
        }).finally(() => {
            setIdle();
        })
    }, [])

    const onUpdate = (formInput: FieldProps) => {
        setLoading();
        rewardService.updateCoinExchangeConfig(formInput.coinToPointRate, formInput.rewardRecurringAmount).then(res => {
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
            <Stack gap={2} maxWidth={200} mt={2}>
                <Controller render={({ field: { ref, ...rest } }) => (
                    <TextField {...rest}
                        inputMode="decimal"
                        label={t('enter rate')}
                        onChange={(event) => rest.onChange(formatToDecimal(event.target.value))}
                        error={errors.coinToPointRate?.message !== undefined}
                        helperText={errors.coinToPointRate?.message} />
                )}
                    name="coinToPointRate"
                    control={control}
                />
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