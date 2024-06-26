import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useBrandManager from "../../hook/useBrandManager";
import { Button, TextField } from "../widget/mui";

interface SearchProps {
    query: string
    locale: string
}

export default function BrandFilter() {
    const { t } = useTranslation();
    const { fetchBrands } = useBrandManager();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SearchProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            query: '',
            locale: 'KR'
        }
    });
    const onSearch = (input: SearchProps) => {
        fetchBrands(input.query, input.locale)
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
            <Controller
                render={({ field: { onChange, value } }) => (
                    <RadioGroup
                        row
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        <FormControlLabel
                            control={<Radio color="info" />}
                            label="KR"
                            value="KR"
                        />
                        <FormControlLabel
                            control={<Radio color="info" />}
                            label="IN"
                            value="IN"
                        />
                    </RadioGroup>
                )}
                control={control}
                name="locale"
            />
        </form>
    )
}