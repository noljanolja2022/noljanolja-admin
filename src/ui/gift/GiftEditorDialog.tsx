import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import { Gift, GiftCategory } from "../../data/model/Gift";
import useGiftCategoryManager from "../../hook/useGiftCategory";
import useGiftManager from "../../hook/useGiftManager";
import giftService from "../../service/GiftService";
import { useLoadingStore } from "../../store/LoadingStore";
import { parseDate } from "../../util/DateUtil";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "../widget/mui";

type Props = {
    data: Gift,
    onClose: () => void
}

interface FormProps {
    // name: string;
    // description: string;
    category: Nullable<GiftCategory>;
    price: number;
    isActive: boolean;
    isFeatured: boolean;
    isTodayOffer: boolean;
}


export function GiftEditorDialog({ data, onClose }: Props) {
    // const theme = useTheme();
    const { setLoading, setIdle, showSuccessNoti } = useLoadingStore();
    const { fetchGifts } = useGiftManager();
    const { categories } = useGiftCategoryManager();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            isActive: data?.isActive ?? false,
            price: data?.price ?? 0,
            category: data?.category,
            isFeatured: data?.isFeatured ?? false,
            isTodayOffer: data?.isTodayOffer ?? false,
        }
    });

    const onUpdate = (formInput: FormProps) => {
        setLoading()
        giftService.updateGift(data.id, formInput.price, formInput.isActive, formInput.isFeatured, formInput.isTodayOffer, formInput.category?.id).then(res => {
            if (res.isFailure()) {
                control.setError("root", { message: res.getErrorMsg() })
                return;
            }
            onClose();
            showSuccessNoti('Gift updated successfully')
            fetchGifts();
        }).finally(() => {
            setIdle()
        })
    }

    return (
        <Dialog open fullWidth maxWidth="md">
            <DialogTitle>Update Gift</DialogTitle>
            <form onSubmit={handleSubmit(onUpdate)} >
                <DialogContent>
                    <Grid container
                        rowSpacing={4}
                        alignItems="stretch"
                        columnSpacing={{ md: 8 }}>
                        <Grid item md={5}
                            display={'flex'}
                            flexDirection={'column'}
                            gap={1}>
                            <Box display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>
                                <Box width={128} height={128} borderRadius={4} overflow={'hidden'}>
                                    <img alt={'avatar-placeholder'}
                                        src={data.image}
                                        className='auto-scale-thumbnail' />
                                </Box>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'} gap={1}>
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                                    <Typography>{t('label_status')}</Typography>
                                    <Controller
                                        render={({ field: { ref, ...rest } }) => (
                                            <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />
                                        )}
                                        control={control}
                                        name="isActive"
                                    />
                                    <Typography>{t('label_featured')}</Typography>
                                    <Controller
                                        render={({ field: { ref, ...rest } }) => (
                                            <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />
                                        )}
                                        control={control}
                                        name="isFeatured"
                                    />
                                </Box>
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                                    <Typography>{t('label_today_offer')}</Typography>
                                    <Controller
                                        render={({ field: { ref, ...rest } }) => (
                                            <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />
                                        )}
                                        control={control}
                                        name="isTodayOffer"
                                    />
                                </Box>
                            </Box>



                            <TextField value={parseDate(new Date(data.endTime))}
                                disabled
                                label={t('label_expire_date')}
                                fullWidth />
                            <TextField value={data.brand.name}
                                disabled
                                label={t('label_brand')}
                                fullWidth />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <FormControl>
                                    <InputLabel>{t('label_category')}</InputLabel>
                                    <Select
                                        value={rest.value?.id}
                                        defaultValue={''}
                                        label={t('label_brand')}
                                        renderValue={_ =>
                                            <Typography>
                                                {rest.value?.name || 'Please select a brand*'}
                                            </Typography>
                                        }
                                        onChange={(event) => {
                                            const newId = event.target.value as number;
                                            const newValue = categories.filter(e => e.id == newId)[0]
                                            setValue("category", newValue)
                                        }}>
                                        {categories.map(item =>
                                            <MenuItem key={item.id}
                                                value={item.id}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}>
                                                {item.name}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>

                            )}
                                name="category"
                                control={control}
                            />
                        </Grid>
                        <Grid item md={7} display={'flex'} flexDirection={'column'} gap={1} >
                            <TextField
                                label={t('label_name')}
                                value={data.name}
                                disabled
                                fullWidth />
                            <TextField
                                multiline={true}
                                rows={6}
                                label={t('label_description')}
                                value={data.description}
                                disabled
                                fullWidth />
                            <TextField
                                label={t('label_retail_price')}
                                value={data.retailPrice}
                                disabled
                                fullWidth />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth required
                                    inputMode="decimal"
                                    label={'Enter price'}
                                    error={errors.price?.message !== undefined}
                                    helperText={errors.price?.message} />
                            )}
                                name="price"
                                control={control}
                            />

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" >{data?.id != null ? t('label_save') : t('label_add')}</Button>
                    <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}