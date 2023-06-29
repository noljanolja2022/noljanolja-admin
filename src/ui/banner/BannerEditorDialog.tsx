import { Controller, useForm } from "react-hook-form";
import { Banner, BannerAction, BannerPriority } from "../../data/model/BannerModels"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "../widget/mui";
import { DateTimePickerInput } from "../widget/DateWidget";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import bannerService from "../../service/BannerService";
import { useLoadingStore } from "../../store/LoadingStore";
import useBannerManager from "../../hook/useBannerManager";
import { Result } from "../../data/model/Result";

type Props = {
    data: Partial<Banner>;
    onClose: () => void
}

const fileTypes = ["jpg", "png"];

interface FormProps {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    content: string,
    status: boolean;
    priority: BannerPriority,
    action: BannerAction,
}

export default function BannerEditorDialog({ data, onClose }: Props) {
    const { t } = useTranslation();
    const { setLoading, setIdle, showErrorNoti, showSuccessNoti } = useLoadingStore();
    const { fetch } = useBannerManager();
    const [image, setImage] = useState<Nullable<File>>(null);
    const [imagePreview, setImagePreview] = useState<Nullable<string>>(data?.image || null)

    const {
        control,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<FormProps>({
        defaultValues: {
            status: true,
            name: data?.title,
            description: data?.description,
            content: data?.content,
            priority: data?.priority,
            action: data?.action,
            startTime: data?.startTime,
            endTime: data?.endTime,
            // price: data.price,
            // codes: data.codes,
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

    const onUpdate = async (fi: FormProps) => {
        if (fi.startTime >= fi.endTime) {
            setError("root", { message: "Effective Date can't be smaller than Expire date" });
            return;
        }
        if (data.id == null && image == null) {
            setError("root", { message: "Banner can't be empty" });
            return;
        }
        clearErrors();
        setLoading();
        let res: Result<any>;
        try {
            if (data.id == null) {
                res = await bannerService.createBanner({
                    title: fi.name,
                    content: fi.content,
                    description: fi.description,
                    image: image!,
                    startTime: fi.startTime,
                    endTime: fi.endTime,
                    isActive: fi.status,
                    action: fi.action,
                    priority: fi.priority,
                })
            } else {
                res = await bannerService.updateBanner({
                    id: data.id!,
                    title: fi.name,
                    content: fi.content,
                    description: fi.description,
                    image: image || data?.image || null,
                    startTime: fi.startTime,
                    endTime: fi.endTime,
                    isActive: fi.status,
                    action: fi.action,
                    priority: fi.priority,
                })
            }
            if (res.isFailure()) {
                showErrorNoti(res.getErrorMsg())
                return;
            }
            showSuccessNoti('Update Banner succesfully');
            fetch();
            onClose();
        } catch (e) {
            alert('here')
        } finally {
            setIdle();
        }
    }

    return (
        <Dialog open fullWidth maxWidth="md">
            <DialogTitle>Update Banner</DialogTitle>
            <form onSubmit={handleSubmit(onUpdate)}>
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
                                        src={imagePreview ? imagePreview : 'placeholder_bg.png'}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }} />
                                </Box>
                                <FileUploader handleChange={onThumbnailChange}
                                    name="image"
                                    fileOrFiles={image}
                                    types={fileTypes} >
                                    <Button>{t('label_update')}</Button>
                                </FileUploader>
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography>Status</Typography>
                                <Controller
                                    render={({ field: { ref, ...rest } }) =>
                                        <Switch checked={rest.value} onChange={(e) => rest.onChange(e.target.checked)} />}
                                    control={control}
                                    name="status"
                                />
                            </Box>

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
                                    label={'Enter content'} required
                                    error={errors.content?.message !== undefined}
                                    helperText={errors.content?.message} />
                            )}
                                name="content"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    required
                                    multiline={true}
                                    rows={3}
                                    fullWidth
                                    label={'Enter description'}
                                    error={errors.description?.message !== undefined}
                                    helperText={errors.description?.message} />
                            )}
                                name="description"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <FormControl>
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        required
                                        defaultValue={''}
                                        label={'Priority'}
                                        value={rest.value || ''}
                                        renderValue={_ =>
                                            <Typography>
                                                {rest.value || ''}
                                            </Typography>
                                        }
                                        onChange={(event) => {
                                            const newVal = event.target.value as string;
                                            setValue("priority", newVal as BannerPriority)
                                        }}>
                                        {Object.values(BannerPriority).map(item =>
                                            <MenuItem key={item} value={item} sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 2,
                                            }}>
                                                {item}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            )}
                                name="priority"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <FormControl>
                                    <InputLabel>Action</InputLabel>
                                    <Select
                                        required
                                        defaultValue={''}
                                        label={'Action'}
                                        value={rest.value || ''}
                                        renderValue={_ =>
                                            <Typography>
                                                {rest.value || ''}
                                            </Typography>
                                        }
                                        onChange={(event) => {
                                            const newVal = event.target.value as string;
                                            setValue("action", newVal as BannerAction)
                                        }}>
                                        {Object.values(BannerAction).map(item =>
                                            <MenuItem key={item} value={item} sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 2,
                                            }}>
                                                {item}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            )}
                                name="action"
                                control={control}
                            />

                        </Grid>
                    </Grid>
                    <Box textAlign={'center'} pt={2}>
                        {errors.root?.message && <Typography color={'red'}>{errors.root.message}</Typography>}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" >{data.id != null ? t('label_save') : t('label_add')}</Button>
                    <Button color="neutral" onClick={onClose}>{t('label_cancel')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}