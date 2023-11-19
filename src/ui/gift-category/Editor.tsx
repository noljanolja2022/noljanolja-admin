import { t } from "i18next";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GiftCategory } from "../../data/model/Gift";
import useGiftCategoryManager from "../../hook/useGiftCategory";
import giftService from "../../service/GiftService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "../widget/mui";

type Props = {
    data: Partial<GiftCategory>
    onClose: () => void
}

interface FormProps {
    name: string;
    // image: string;
}

export default function EditorDialog({ data, onClose }: Props) {
    const { setLoading, setIdle, showSuccessNoti } = useLoadingStore();
    const { fetch } = useGiftCategoryManager();
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
            name: data.name ?? ''
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
        // TODO: use this block if we need to set image for category
        // if (data.image) {
        //     onUpdate(inputForm.name, image)
        // } else {
        //     if (!imagePreview) {
        //         setError("image", { message: "Image Required" })
        //     } else {
        //         onUpdate(inputForm.name, image)
        //     }
        // }
        onUpdate(inputForm.name)
    }

    const onUpdate = (name: string) => {
        setLoading()
        giftService.updateCategory({
            id: data.id ?? 0,
            name: name,
        }).then(res => {
            if (res.isFailure()) {
                return;
            }
            onClose();
            showSuccessNoti('Brand created succesfully')
            fetch()
        }).finally(() => {
            setIdle()
        })
    }

    return (
        <Dialog open>
            <DialogTitle>Update Category</DialogTitle>
            <form onSubmit={handleSubmit(onSave)} >
                <DialogContent>
                    <Grid container alignItems="center"
                        rowSpacing={1}
                        columnSpacing={{ md: 2 }}
                        minWidth={'500px'}>
                        {/* <Grid item md={4} display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>
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
                        </Grid> */}
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