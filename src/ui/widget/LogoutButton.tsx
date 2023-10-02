import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { firebaseAuthInstance } from "../../service/FirebaseService";
import { useAuthStore } from "../../store/AuthStore";
import { useUserStore } from "../../store/UserStore";
import { LoginPath } from "../../util/routes";
import { Box } from "./mui";

function LogoutButton() {
    const navigate = useNavigate();
    const {setBearer} = useAuthStore();
    const {setUser} = useUserStore();
    const { t } = useTranslation();

    const onLogout = () => {
        setUser(null)
        setBearer(null);
        signOut(firebaseAuthInstance).then(() => {
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