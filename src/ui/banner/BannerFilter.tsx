

import { useTranslation } from "react-i18next";
import { Button, TextField } from "../widget/mui";
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";
import useBannerManager from "../../hook/useBannerManager";

interface SearchProps {
    name: string
}

  
export default function BannerFilter() {
    const { t } = useTranslation();
    const { fetch } = useBannerManager();
    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SearchProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            name: '',
        }
    });
    const onSearch = (input: SearchProps) => {
        fetch(input.name)
    }

    return (
        <form onSubmit={handleSubmit(onSearch)} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <TextField  sx={{
                lineHeight: 'inherit'
            }}
            label={t('hint_search')} onChange={(e) => setValue("name", e.currentTarget.value)} />
            <Button type="submit" startIcon={<SearchIcon />}>
            </Button>
        </form>
    )
}