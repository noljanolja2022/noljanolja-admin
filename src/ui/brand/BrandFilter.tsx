import { useTranslation } from "react-i18next";
import { Button, TextField } from "../widget/mui";
import SearchIcon from '@mui/icons-material/Search';
import useBrandManager from "../../hook/useBrandManager";
import { FormEventHandler } from "react";
import { useForm } from "react-hook-form";

interface SearchProps {
    name: string
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
            name: '',
        }
    });
    const onSearch = (input: SearchProps) => {
        fetchBrands(input.name)
    }

    return (
        <form onSubmit={handleSubmit(onSearch)} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <TextField label={t('hint_search')} onChange={(e) => setValue("name", e.currentTarget.value)} />
            <Button type="submit" startIcon={<SearchIcon />}>
            </Button>
        </form>
    )
}