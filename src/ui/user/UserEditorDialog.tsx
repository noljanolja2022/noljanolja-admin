import { useTranslation } from "react-i18next";
import { Gender, User } from "../../data/model/UserModels";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "../widget/mui";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { DatePickerInput } from "../widget/DateWidget";
import { imageFileTypes } from "../../util/Constants";
import { useLoadingStore } from "../../store/LoadingStore";
import userService from "../../service/UserService";
import useUsersManager from "../../hook/useUsersManager";

type Props = {
    data: Partial<User>;
    onClose: () => void;
}

type FormProps = {
    name: string;
    phone: string;
    avatar: string;
    email: string;
    gender: Gender;
    dob?: Date;
}

export default function UserEditorDialog({ data, onClose }: Props) {
    const { t } = useTranslation();
    const { setLoading, setIdle, showSuccessNoti } = useLoadingStore();
    const { users, totalPage, currentPage, setCurrentPage, fetch } = useUsersManager();
    const [image, setImage] = useState<Nullable<File>>(null);
    const [imagePreview, setImagePreview] = useState<Nullable<string>>(data?.avatar || null)
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            name: data?.name,
            phone: data?.phone,
            avatar: data?.avatar,
            email: data.email,
            gender: data.gender,
            dob: data.dob ? new Date(data.dob) : undefined
        }
    });

    useEffect(() => {
        if (image) {
            setImagePreview(URL.createObjectURL(image))
        }
    }, [image])

    const onUpdate = (formInput: FormProps) => {
        setLoading()
        if (data?.id != null) {
            userService.updateUser(data.id!, {
                avatar: image,
                name: formInput.name,
                email: formInput.email,
                gender: formInput.gender,
                dob: formInput.dob
            }).then(res => {
                if (res.isFailure()) {
                    control.setError("root", { message: res.getErrorMsg() })
                    return;
                }
                onClose();
                showSuccessNoti('User updated successfully')
                fetch();
            }).finally(() => {
                setIdle()
            })
        } else {
            userService.createUser({
                avatar: image,
                name: formInput.name,
                email: formInput.email,
                gender: formInput.gender,
                dob: formInput.dob
            }).then(res => {
                if (res.isFailure()) {
                    control.setError("root", { message: res.getErrorMsg() })
                    return;
                }
                onClose();
                showSuccessNoti('User created successfully')
                fetch();
            }).finally(() => {
                setIdle()
            })
        }
    }

    return (
        <Dialog open fullWidth maxWidth="md">
            <DialogTitle>Update User</DialogTitle>
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
                                <FileUploader handleChange={setImage}
                                    name="image"
                                    fileOrFiles={image}
                                    types={imageFileTypes} >
                                    <Button>{t('label_update')}</Button>
                                </FileUploader>
                            </Box>
                            {/* <Controller render={({ field: { ref, ...rest } }) => (
                                <FormControl>
                                    <InputLabel>{t('label_category')}</InputLabel>
                                    <Select
                                        label={t('label_category')}
                                        defaultValue={''}
                                        value={rest.value?.id}
                                        renderValue={_ =>
                                            <Typography>
                                                {rest.value?.code}
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
                                </FormControl>
                            )}
                                name="category"
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
                            /> */}

                            <Controller render={({ field: { ref, ...rest } }) => (
                                <DatePickerInput label={'Birthday'}
                                    value={rest.value ? dayjs(rest.value) : null}
                                    onChange={(e) => rest.onChange(e?.toDate())} />
                            )}
                                name="dob"
                                control={control}
                            />
                        </Grid>
                        <Grid item md={7} display={'flex'} flexDirection={'column'} gap={1}>
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={'Enter name'} required
                                    error={errors.name?.message !== undefined}
                                    helperText={errors.name?.message} />
                            )}
                                name="name"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={'Enter phone'} required
                                    error={errors.phone?.message !== undefined}
                                    helperText={errors.phone?.message} />
                            )}
                                name="phone"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={'Enter email'}
                                    error={errors.email?.message !== undefined}
                                    helperText={errors.email?.message} />
                            )}
                                name="email"
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
    );
}