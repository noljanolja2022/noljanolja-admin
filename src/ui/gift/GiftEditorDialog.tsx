import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";
import { Gift, GiftBrand } from "../../data/model/Gift";
import useBrandManager from "../../hook/useBrandManager";
import useGiftManager from "../../hook/useGiftManager";
import giftService from "../../service/GiftService";
import { useLoadingStore } from "../../store/LoadingStore";
import { imageFileTypes } from "../../util/Constants";
import { DateTimePickerInput } from "../widget/DateWidget";
import { Box, Button, ChipTextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "../widget/mui";

type Props = {
    data: Partial<Gift>,
    onClose: () => void
}

interface FormProps {
    name: string;
    description: string;
    brand: GiftBrand;
    startTime: Date;
    endTime: Date;
    price: number;
    codes: string[];
}


export function GiftEditorDialog({ data, onClose }: Props) {
    // const theme = useTheme();
    const { setLoading, setIdle, showSuccessNoti } = useLoadingStore();
    const {  fetchGifts } = useGiftManager();
    const { brands } = useBrandManager();
    const [image, setImage] = useState<Nullable<File>>(null);
    const [imagePreview, setImagePreview] = useState<Nullable<string>>(data?.image || null)
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            name: data?.name,
            description: data?.description,
            brand: data?.brand,
            endTime: data?.endTime,
            price: data?.price,
        }
    });
    const onThumbnailChange = (file: File) => {
        setImage(file);
    };

    useEffect(() => {
        if (image) {
            setImagePreview(URL.createObjectURL(image))
        }
    }, [image])

    const onUpdate = (formInput: FormProps) => {
        setLoading()
        if (data?.id != null) {
            giftService.updateGift(data.id!,
                image, formInput.name, formInput.description,
                formInput.startTime,
                formInput.endTime, formInput.price).then(res => {
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
                                    <img alt={image ? image.name : 'avatar-placeholder'}
                                        src={imagePreview ? imagePreview : 'placeholder_avatar.png'}
                                        className='auto-scale-thumbnail' />
                                </Box>
                                <FileUploader handleChange={onThumbnailChange}
                                    name="image"
                                    fileOrFiles={image}
                                    types={imageFileTypes} >
                                    <Button>{t('label_update')}</Button>
                                </FileUploader>
                            </Box>
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
                                            const newId = event.target.value as number;
                                            const newValue = brands.filter(e => e.id == newId)[0]
                                            setValue("brand", newValue)
                                        }}>
                                        {brands.map(item =>
                                            <MenuItem key={item.id}
                                                value={item.id}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}>
                                                <img alt={item.name} width={40} src={item.image} />
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
                                <DateTimePickerInput label={t('label_effective_date')}
                                    value={rest.value ? dayjs(rest.value) : null}
                                    onChange={rest.onChange} />
                            )}
                                name="startTime"
                                control={control}
                            />

                            <Controller render={({ field: { ref, ...rest } }) => (
                                <DateTimePickerInput label={t('label_expire_date')}
                                    value={rest.value ? dayjs(rest.value) : null}
                                    onChange={rest.onChange} />
                            )}
                                name="endTime"
                                control={control}
                            />
                        </Grid>
                        <Grid item md={7} display={'flex'} flexDirection={'column'} gap={1} >
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={t('hint_enter_name')} required
                                    error={errors.name?.message !== undefined}
                                    helperText={errors.name?.message} />
                            )}
                                name="name"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    multiline={true}
                                    rows={3}
                                    fullWidth
                                    label={t('hint_enter_description')}
                                    error={errors.description?.message !== undefined}
                                    helperText={errors.description?.message} />
                            )}
                                name="description"
                                control={control}
                            />

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
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <ChipTextField rows={3}
                                    hideClearAll disableDeleteOnBackspace
                                    {...rest} />
                            )}
                                name="codes"
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