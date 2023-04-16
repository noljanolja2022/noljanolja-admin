import { useTranslation } from "react-i18next";
import { MdLogout } from "react-icons/md";
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onLogout = () => {
        AuthService.logout().then(() => {
            navigate('/login', { replace: true })
        }).catch(err => {
            alert(err)
        });
    }

    return (
        <div className="flex flex-row gap-2 items-center cursor-pointer w-28" onClick={onLogout}>
            <MdLogout />
            <span>{t('label_logout')}</span>
        </div>
    )
}

export default LogoutButton;