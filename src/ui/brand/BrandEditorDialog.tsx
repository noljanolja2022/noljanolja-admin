import { t } from "i18next";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";
import { GiftBrand } from "../../data/model/Gift";
import useBrandManager from "../../hook/useBrandManager";
import giftService from "../../service/GiftService";
import { useLoadingStore } from "../../store/LoadingStore";
import { imageFileTypes } from "../../util/Constants";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "../widget/mui";

type Props = {
    data: Partial<GiftBrand>
    onClose: () => void
}

interface FormProps {
    name: string;
    image: string;
}

export default function BrandEditorDialog({ data, onClose }: Props) {
    const { setLoading, setIdle, showSuccessNoti } = useLoadingStore();
    const { fetchBrands } = useBrandManager();
    const [image, setImage] = useState<Nullable<File>>(null);
    const [imagePreview, setImagePreview] = useState<Nullable<string>>(data.image || null)
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<FormProps>({
        defaultValues: {
            name: data.name || ''
        }
    });
    useEffect(() => {
        setValue("image", imagePreview || '')
        if (imagePreview && errors.image?.message !== null) {
            clearErrors("image")
        }
    }, [imagePreview])

    const handleChange = (file: File) => {
        setImage(file);
        setImagePreview(file ? URL.createObjectURL(file) : null)
    };

    const onSave = (inputForm: FormProps) => {
        if (data.image) {
            onUpdateBrand(inputForm.name, true, image)
        } else {
            if (!imagePreview) {
                setError("image", { message: "Image Required" })
            } else {
                onUpdateBrand(inputForm.name, false, image)
            }
        }
    }

    const onUpdateBrand = (name: string, isUpdate: boolean, img: Nullable<File>,) => {
        setLoading()
        if (isUpdate) {
            giftService.updateBrand(data.id!, img, name).then(res => {
                if (res.isFailure()) {
                    return;
                }
                showSuccessNoti('Brand updated succesfully')
                fetchBrands()
                onClose();
            }).finally(() => {
                setIdle()
            })
        } else {
            giftService.createBrand(img!, name).then(res => {
                if (res.isFailure()) {
                    return;
                }
                onClose();
                showSuccessNoti('Brand created succesfully')
                fetchBrands()
            }).finally(() => {
                setIdle()
            })
        }
    }

    return (
        <Dialog open>
            <DialogTitle>Update Brand</DialogTitle>
            <form onSubmit={handleSubmit(onSave)} >
                <DialogContent>
                    <Grid container alignItems="center"
                        rowSpacing={1}
                        columnSpacing={{ md: 2 }}
                        minWidth={'500px'}>
                        <Grid item md={4} display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>
                            <Box width={128} height={128} borderRadius={4} overflow={'hidden'}>
                                <img alt={image ? image.name : 'placeholder'}
                                    src={imagePreview ? imagePreview : 'placeholder_bg.png'}
                                    className='auto-scale-thumbnail' />
                            </Box>
                            <FileUploader handleChange={handleChange}
                                fileOrFiles={image}
                                types={imageFileTypes} >
                                <Button>{t('label_update')}</Button>
                            </FileUploader>
                            {errors.image?.message && <Typography color={'red'}>{errors.image.message}</Typography>}
                        </Grid>
                        <Grid item md={8} display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>
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
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" >{data.id ? t('label_save') : t('label_add')}</Button>
                    <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}