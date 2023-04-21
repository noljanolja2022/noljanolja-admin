import { useTranslation } from "react-i18next";
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { LoginPath } from "../../util/routes";
import { Box } from "./mui";

function LogoutButton() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onLogout = () => {
        AuthService.logout().then(() => {
            navigate(LoginPath, { replace: true })
        }).catch(err => {
            alert(err)
        });
    }

    return (
        <Box display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1} sx={{
                cursor: "pointer"
            }} onClick={onLogout}>
            <LogoutIcon />
            <span>{t('label_logout')}</span>
        </Box>
    )
}

export default LogoutButton;