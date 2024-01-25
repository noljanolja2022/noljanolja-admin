import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import { GiftBrand, GiftCategory } from "../../data/model/Gift";
import giftService from "../../service/GiftService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "../widget/mui";

type Props = {
    data: GiftAddDialogParams,
    onClose: () => void
}

export interface GiftAddDialogParams {
    brands: GiftBrand[];
    categories: GiftCategory[];
}

interface FormProps {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    brandId: string;
    categoryId: number;
    price: number;
    category: Nullable<GiftCategory>;
    brand: Nullable<GiftBrand>;
    isActive: boolean;
}

export function GiftAddDialog({data, onClose }: Props) {
    const { setLoading, setIdle, showSuccessNoti } = useLoadingStore();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        defaultValues: {
            id: '',
            name: '',
            description:  '',
            imageUrl: '',
            brandId:  data.brands[0]?.id ?? '',
            categoryId:  data.categories[0]?.id ?? 0,
            price:  0,
            isActive: true,
        }
    });

    const importIndianGift = (formInput: FormProps) => {
        console.log(formInput)
        setLoading()
        giftService.importIndianGift(
            formInput.id,
            formInput.name,
            formInput.description,
            formInput.imageUrl,
            formInput.brandId,
            formInput.categoryId,
            formInput.price,
            formInput.isActive
        ).then(res => {
            if (res.isFailure()) {
                control.setError("root", { message: res.getErrorMsg() })
                return;
            }
            onClose();
            showSuccessNoti('Import Indian gift successfully')
        }).finally(() => {
            setIdle()
        })
    }

    return (
        <Dialog open fullWidth maxWidth="sm">
            <DialogTitle>Add Gift (Indian Only)</DialogTitle>
            <form onSubmit={handleSubmit(importIndianGift)} >
                <DialogContent>
                    <Grid item 
                        display={'flex'}
                        flexDirection={'column'}
                        gap={1}>

                        <Controller render={({ field: { ref, ...rest } }) => (
                            <TextField {...rest}
                                label={t('label_voucher_code')}
                                fullWidth />
                            )}
                            name="id"
                            control={control}
                        />

                        <Controller render={({ field: { ref, ...rest } }) => (
                            <TextField {...rest}
                                label={t('label_name')}
                                fullWidth />
                            )}
                            name="name"
                            control={control}
                        />

                        <Controller render={({ field: { ref, ...rest } }) => (
                            <TextField {...rest}
                                multiline={true}
                                rows={6}
                                label={t('label_description')}
                                fullWidth />
                            )}
                            name="description"
                            control={control}
                        />

                        <Controller render={({ field: { ref, ...rest } }) => (
                            <TextField  {...rest}
                                label={t('label_image_url')}
                                fullWidth />
                            )}
                            name="imageUrl"
                            control={control}
                        />
                        
                        <Controller render={({ field: { ref, ...rest } }) => (
                            <FormControl>
                                <InputLabel>{t('label_brand')}</InputLabel>
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
                                        const newId = event.target.value as string;
                                        const newValue =  data.brands.filter(e => e.id == newId)[0]
                                        setValue("brand", newValue)
                                    }}>
                                    {
                                    data.brands.map(item =>
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
                            name="brand"
                            control={control}
                        />

                        <Controller render={({ field: { ref, ...rest } }) => (
                            <FormControl>
                                <InputLabel>{t('label_category')}</InputLabel>
                                <Select
                                    value={rest.value?.id}
                                    defaultValue={''}
                                    label={t('label_category')}
                                    renderValue={_ =>
                                        <Typography>
                                            {rest.value?.name || 'Please select a category*'}
                                        </Typography>
                                    }
                                    onChange={(event) => {
                                        const newId = event.target.value as number;
                                        const newValue = data.categories.filter(e => e.id == newId)[0]
                                        setValue("category", newValue)
                                    }}>
                                    {data.categories.map(item =>
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

                        <Controller render={({ field: { ref, ...rest } }) => (
                            <TextField {...rest}
                                fullWidth required
                                label={'Enter price'}
                                error={errors.price?.message !== undefined}
                                helperText={errors.price?.message} />
                        )}
                            name="price"
                            control={control}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" >{t('label_add')}</Button>
                    <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}