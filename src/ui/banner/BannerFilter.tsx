

import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "../widget/mui";

export interface BannerSearchProps {
    name: string
}

type Props = {
    onSearch: (props: BannerSearchProps) => void
}

export default function BannerFilter(props: Props) {
    const { t } = useTranslation();
    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<BannerSearchProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            name: '',
        }
    });

    return (
        <form onSubmit={handleSubmit(props.onSearch)} style={{ display: 'flex', gap: 4,flexGrow: 1, alignItems: 'center' }}>
            <TextField size='small' sx={{
                lineHeight: 'inherit'
            }}
                label={t('hint_search')} onChange={(e) => setValue("name", e.currentTarget.value)} />
            <Button type="submit" startIcon={<SearchIcon />}>{t('label_search')}</Button>
        </form>
    )
}