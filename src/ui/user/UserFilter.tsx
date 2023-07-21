

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useUsersManager from "../../hook/useUsersManager";
import { Button, TextField } from "../widget/mui";

interface SearchProps {
    query: string
}


export default function UserFilter() {
    const { t } = useTranslation();
    const { fetch } = useUsersManager();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SearchProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            query: '',
        }
    });
    const onSearch = (input: SearchProps) => {
        fetch(input.query)
    }

    return (
        <form onSubmit={handleSubmit(onSearch)} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Controller
                render={({ field: { ref, ...rest } }) =>
                    <TextField size="small" value={rest.value}
                        placeholder={t('hint_search')} onChange={rest.onChange}
                        InputProps={{
                            endAdornment: rest.value ?
                                <IconButton onClick={() => rest.onChange('')}>
                                    <CloseIcon />
                                </IconButton> : null
                        }} />}
                control={control}
                name="query"
            />
            <Button type="submit" startIcon={<SearchIcon />}>{t('label_search')}</Button>
        </form>
    )
}