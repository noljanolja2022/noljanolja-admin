import { Controller, useForm } from "react-hook-form";
import { useLoadingStore } from "../../store/LoadingStore";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Select, TextField, Typography, useTheme } from "../widget/mui";
import { t } from "i18next";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import useGiftManager from "../../hook/useGiftManager";
import { Gift, GiftBrand, GiftCategory } from "../../data/model/Gift";
import { SelectChangeEvent } from "@mui/material/Select";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useBrandManager from "../../hook/useBrandManager";
import giftService from "../../service/GiftService";
import { DateTimePickerInput } from "../widget/DateWidget";
import dayjs from "dayjs";

type Props = {
    data: Gift,
    onClose: () => void
}

interface ImportFormProps {
    name: string;
    description: string;
    category: GiftCategory;
    brand: GiftBrand;
    startTime: Date;
    endTime: Date;
    price: number;
}
const fileTypes = ["jpg", "png"];

export function GiftEditorDialog({ data, onClose }: Props) {
    const theme = useTheme();
    const { setLoading, setIdle, showSuccessNoti } = useLoadingStore();
    const { categories, fetchGifts } = useGiftManager();
    const { brands } = useBrandManager();
    const [image, setImage] = useState<Nullable<File>>(null);
    const [imagePreview, setImagePreview] = useState<Nullable<string>>(data.image)
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ImportFormProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            name: data.name,
            description: data.description,
            category: data.category,
            brand: data.brand,
            startTime: data.startTime,
            endTime: data.endTime,
            price: data.price
        }
    });
    const handleChange = (file: File) => {
        setImage(file);
    };

    useEffect(() => {
        if (image) {
            setImagePreview(URL.createObjectURL(image))
        }
    }, [image])

    const onUpdate = (formInput: ImportFormProps) => {
        setLoading()
        if (data.id > 0) {
            giftService.updateGift(data.id,
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
        } else {
            giftService.createGift(formInput.name,
                formInput.description, image!, [], new Date(), new Date(),
                formInput.category.id, formInput.brand.id, formInput.price).then(res => {
                    if (res.isFailure()) {
                        control.setError("root", { message: res.getErrorMsg() })
                        return;
                    }
                    onClose();
                    showSuccessNoti('Gift created successfully')
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
                    <Grid container alignItems="stretch"
                        columnSpacing={{ md: 8 }}>
                        <Grid item md={5}
                            display={'flex'}
                            flexDirection={'column'}
                            gap={1}>
                            <Box display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>
                                <Box width={128} height={128} borderRadius={4} overflow={'hidden'}>
                                    <img alt={image ? image.name : 'avatar-placeholder'}
                                        src={imagePreview ? imagePreview : 'placeholder_avatar.png'}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }} />
                                </Box>
                                <FileUploader handleChange={handleChange}
                                    name="image"
                                    fileOrFiles={image}
                                    types={fileTypes} >
                                    <Button>
                                        Update
                                    </Button>
                                </FileUploader>
                            </Box>
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <Select
                                    value={rest.value?.id || ''}
                                    displayEmpty
                                    renderValue={_ =>
                                        <Typography>
                                            {rest.value?.code || 'Please select a category*'}
                                        </Typography>
                                    }
                                    onChange={(event) => {
                                        const newId = event.target.value as number;
                                        const newCategory = categories.filter(e => e.id == newId)[0]
                                        setValue("category", newCategory)
                                    }}>
                                    {categories.map(item =>
                                        <MenuItem key={item.id} value={item.id} sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 2,
                                        }}>
                                            <img alt={item.code} width={40} src={item.image} />
                                            {item.code}
                                        </MenuItem>
                                    )}
                                </Select>
                            )}
                                name="category"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <Select
                                    value={rest.value?.id || ''}
                                    displayEmpty
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
                            )}
                                name="brand"
                                control={control}
                            />
                        </Grid>
                        <Grid item md={7} display={'flex'} flexDirection={'column'} gap={1} >
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={'Enter gift name'} required
                                    error={errors.name?.message !== undefined}
                                    helperText={errors.name?.message} />
                            )}
                                name="name"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={'Enter description'}
                                    error={errors.description?.message !== undefined}
                                    helperText={errors.description?.message} />
                            )}
                                name="description"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <DateTimePickerInput label="Effective Time"
                                    value={rest.value && dayjs(rest.value)}
                                    disablePast onChange={rest.onChange} />
                            )}
                                name="startTime"
                                control={control}
                            />

                            <Controller render={({ field: { ref, ...rest } }) => (
                                <DateTimePickerInput label="Expire Time"
                                    value={rest.value && dayjs(rest.value)}
                                    disablePast onChange={rest.onChange} />
                            )}
                                name="endTime"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
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
                    <Button type="submit" >{t('label_add')}</Button>
                    <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}