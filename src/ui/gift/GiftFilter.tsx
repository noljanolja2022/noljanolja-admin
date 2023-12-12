

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useGiftManager from '../../hook/useGiftManager';
import { Button, TextField } from "../widget/mui";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



interface SearchProps {
    query: string
    isFeatured: boolean
    isTodayOffer: boolean
    isRecommended: boolean
    locale: string
}


export default function GiftFilter() {
    const { t } = useTranslation();
    const { fetchGifts } = useGiftManager();
    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<SearchProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            query: '',
            locale: 'KR'
        }
    });
    const onSearch = (input: SearchProps) => {

        fetchGifts(input.query, input.isFeatured, input.isTodayOffer, input.isRecommended, input.locale)
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
            <Button sx={{ mx: 1 }} type="submit" startIcon={<SearchIcon />}>{t('label_search')}</Button>
            <Controller
                render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                        control={<Switch color="info" checked={value} onChange={(e) => onChange(e.target.checked)} />}
                        label="Top Features"
                    />
                )}
                control={control}
                name="isFeatured"
            />
            <Controller
                render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                        control={<Switch color="info" checked={value} onChange={(e) => onChange(e.target.checked)} />}
                        label="Today Offer"
                    />
                )}
                control={control}
                name="isTodayOffer"
            />
            <Controller
                render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                        control={<Switch color="info" checked={value} onChange={(e) => onChange(e.target.checked)} />}
                        label="Recommended"
                    />
                )}
                control={control}
                name="isRecommended"
            />
        </form>
    )
}