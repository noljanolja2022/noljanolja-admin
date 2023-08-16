import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Banner, BannerAction, BannerPriority } from "../../data/model/BannerModels";
import { Result } from "../../data/model/Result";
import useBannerManager from "../../hook/useBannerManager";
import bannerService from "../../service/BannerService";
import { useLoadingStore } from "../../store/LoadingStore";
import { imageFileTypes } from "../../util/Constants";
import { getTodayDate } from '../../util/DateUtil';
import yup from "../../util/FormValidator";
import { gt } from '../../util/translation/LanguageUtil';
import { DateTimePickerInput } from "../widget/DateWidget";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "../widget/mui";

type Props = {
    data: Partial<Banner>;
    onClose: () => void
}

interface FormProps {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    content: string,
    status: boolean;
    priority: BannerPriority,
    action: BannerAction,
    actionUrl?: string
}

const schema = yup.object<FormProps, any>({
    name: yup.string().trim().required(gt('error_empty_field')),
    description: yup.string().trim().required(gt('error_empty_field')),
    startTime: yup.date().required(gt('error_empty_field')),
    endTime: yup.date().required(gt('error_empty_field')),
    status: yup.boolean(),
    priority: yup.string().required(gt('error_empty_field')),
    action: yup.string().required(gt('error_empty_field')),
    content: yup.string().trim().required(gt('error_empty_field')),
    actionUrl: yup.string().trim()
});

export default function BannerEditorDialog({ data, onClose }: Props) {
    const { t } = useTranslation();
    const { setLoading, setIdle, showErrorNoti, showSuccessNoti } = useLoadingStore();
    const { fetch } = useBannerManager();
    const [image, setImage] = useState<Nullable<File>>(null);
    const [imagePreview, setImagePreview] = useState<Nullable<string>>(data?.image || null)
    const todayDate = getTodayDate()
    const today = dayjs(todayDate);
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
        watch,
    } = useForm<FormProps>({
        defaultValues: {
            status: data?.isActive,
            name: data?.title || '',
            description: data?.description || '',
            content: data?.content || '',
            priority: data?.priority,
            action: data?.action,
            startTime: data?.startTime,
            endTime: data?.endTime,
            actionUrl: data?.actionUrl || '',
            // price: data.price,
            // codes: data.codes,
        },
        resolver: yupResolver(schema)
    });

    const watchAction = watch("action");
    const onThumbnailChange = (file: File) => {
        setImage(file);
    };

    useEffect(() => {
        if (image) {
            setImagePreview(URL.createObjectURL(image))
        }
    }, [image])

    const onUpdate = async (fi: FormProps) => {
        if (fi.startTime < todayDate || fi.endTime < todayDate) {
            setError("root", { message: "Invalid date provided. Please update." });
            return;
        }
        if (fi.startTime >= fi.endTime) {
            setError("root", { message: "Effective Date can't be later than Expire date" });
            return;
        }
        if (data.id == null && image == null) {
            setError("root", { message: "Banner thumbnail required" });
            return;
        }
        if (fi.action != BannerAction.NONE && !fi.actionUrl) {
            setError("root", { message: "Url required" });
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
                    actionUrl: fi.actionUrl,

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
                    actionUrl: fi.actionUrl,
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
        } catch (e: any) {
            showErrorNoti(e)
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
                                        className='auto-scale-thumbnail' />
                                </Box>
                                <FileUploader handleChange={onThumbnailChange}
                                    name="image"
                                    fileOrFiles={image}
                                    types={imageFileTypes} >
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
                                    minDateTime={today}
                                    value={rest.value ? dayjs(rest.value) : null}
                                    onChange={(e) => e && rest.onChange(e.toDate())} />
                            )}
                                name="startTime"
                                control={control}
                            />
                            {errors.startTime?.message && <Typography color={'red'}>{errors.startTime?.message}</Typography>}
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <DateTimePickerInput label={t('label_expire_date')}
                                    minDateTime={today}
                                    value={rest.value ? dayjs(rest.value) : null}
                                    onChange={(e) => e && rest.onChange(e.toDate())} />
                            )}
                                name="endTime"
                                control={control}
                            />
                            {errors.endTime?.message && <Typography color={'red'}>{errors.endTime?.message}</Typography>}
                        </Grid>
                        <Grid item md={7} display={'flex'} flexDirection={'column'} gap={1} >
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={'Enter name'}
                                    error={errors.name?.message !== undefined}
                                    helperText={errors.name?.message} />
                            )}
                                name="name"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}
                                    fullWidth
                                    label={'Enter content'}
                                    error={errors.content?.message !== undefined}
                                    helperText={errors.content?.message} />
                            )}
                                name="content"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <TextField {...rest}

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
                                    {errors.priority?.message && <Typography color={'red'}>{errors.priority.message}</Typography>}
                                </FormControl>
                            )}
                                name="priority"
                                control={control}
                            />
                            <Controller render={({ field: { ref, ...rest } }) => (
                                <FormControl>
                                    <InputLabel>Action</InputLabel>
                                    <Select
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
                                    {errors.action?.message && <Typography color={'red'}>{errors.action.message}</Typography>}
                                </FormControl>
                            )}
                                name="action"
                                control={control}
                            />
                            {watchAction && watchAction != BannerAction.NONE &&
                                <Controller render={({ field: { ref, ...rest } }) => (
                                    <TextField {...rest}
                                        fullWidth
                                        label={'Enter url'}
                                        error={errors.actionUrl?.message !== undefined}
                                        helperText={errors.actionUrl?.message} />
                                )}
                                    name="actionUrl"
                                    control={control}
                                />}
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