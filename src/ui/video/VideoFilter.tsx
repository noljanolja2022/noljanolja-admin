

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useVideoManager from '../../hook/useVideoManager';
import { Button, TextField } from "../widget/mui";

interface SearchProps {
    query: string
    isActive: boolean
}


export default function VideoFilter() {
    const { t } = useTranslation();
    const { fetch } = useVideoManager();
    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<SearchProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            query: '',
        }
    });
    const onSearch = (input: SearchProps) => {
        fetch(input.query, input.isActive)
    }

    return (
        <form onSubmit={handleSubmit(onSearch)} style={{ display: 'flex', flexGrow: 1, gap: 4, alignItems: 'center' }}>
            <Controller
                render={({ field: { ref, ...rest } }) =>
                    <TextField size="small" value={rest.value}
                        InputProps={{
                            endAdornment: rest.value ?
                                <IconButton onClick={() => rest.onChange('')}>
                                    <CloseIcon />
                                </IconButton> : null
                        }}
                        placeholder={t('hint_search')} onChange={rest.onChange} />}
                control={control}
                name="query"
            />
            <Button type="submit" startIcon={<SearchIcon />}>{t('label_search')}</Button>
            <Controller
                render={({ field: { onChange, value, } }) =>
                    <FormControlLabel control={<Checkbox value={value} onChange={onChange} />} label="Active" />
                }
                control={control}
                name="isActive" />
        </form>
    )
}