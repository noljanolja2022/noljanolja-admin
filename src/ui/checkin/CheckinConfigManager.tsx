import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { CheckinProgress } from "../../data/model/CheckinModels";
import rewardService from '../../service/RewardService';
import { useLoadingStore } from '../../store/LoadingStore';
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "../widget/mui";

type FieldProps = {
    configs: CheckinProgress[];
}

export default function CheckinConfigManager() {
    const { t } = useTranslation();
    const { setLoading, setIdle, showSuccessNoti, showErrorNoti } = useLoadingStore();
    const { control, handleSubmit, setError, formState: { errors }, setValue } = useForm<FieldProps>({
        defaultValues: {
            configs: []
        }
    });
    const { fields, remove, append, } = useFieldArray({
        control,
        name: "configs",
        rules: {
            validate: {
                minimum1: v => v.length > 0
            }
        }
    });

    useEffect(() => {
        setLoading()
        rewardService.getCheckinConfig().then(res => {
            if (res.data) {
                setValue("configs", res.data)
            } else {
                setValue("configs", [{ day: 1, rewardPoints: 0 }])
            }
        }).finally(() => {
            setIdle();
        })
    }, [])

    const onUpdate = (input: FieldProps) => {
        const sortedConfigs = input.configs.sort((a, b) => a.day - b.day)
        setValue("configs", sortedConfigs)
        if (input.configs.filter(e => e.day < 1).length > 0) {
            setError("root", { message: "Invalid day config provided" })
            return;
        }
        setLoading()
        rewardService.updateCheckinConfig(sortedConfigs).then(res => {
            if (res.isFailure()) {
                showErrorNoti(res.error?.message)
                return;
            }
            showSuccessNoti('Updated successully')
        }).finally(() => {
            setIdle();
        })
    }

    return (
        <Stack p={4}>
            <form onSubmit={handleSubmit(onUpdate)}>
                <TableContainer sx={{ maxWidth: 850, }}>
                    <Table >
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ minWidth: '300px' }}>
                                {t('label_day')}
                                </TableCell>
                                <TableCell sx={{ minWidth: '300px' }}>
                                    {t('label_points')}
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fields.map((item, index) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Controller
                                                render={({ field }) => <TextField
                                                    type='number' required
                                                    size="small"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(+e.target.value)} />}
                                                name={`configs.${index}.day`}
                                                control={control}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Controller
                                                render={({ field }) => <TextField type='number' required size="small" value={field.value}
                                                    onChange={(e) => field.onChange(+e.target.value)} />}
                                                name={`configs.${index}.rewardPoints`}
                                                control={control}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={t('label_delete')}>
                                                <IconButton onClick={() => {
                                                    remove(index)
                                                }}><RemoveCircleIcon color='error' /></IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>

                </TableContainer>
                {errors.root && <Box pb={1} color="red">
                    {errors.root.message}
                </Box>}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                    maxWidth: 850
                }}>
                    <Button onClick={() => append({ day: 1, rewardPoints: 1 })}>{t('label_add')}</Button>
                    <Button type='submit'>{t('label_save')}</Button>
                </Box>
            </form>
        </Stack>

    )
}