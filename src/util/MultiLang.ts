import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources: {
        en: {
            translation: {
                label_login: "Login",
                label_logout: "Logout",

                label_home: "Dashboard",
                label_membership: "Membership",
                hint_pls_enter_id: "Please enter your username",
                hint_pls_enter_pwd: "Please enter your password",

                error_invalid_email: "Email is invalid. Please try again",
                error_invalid_pwd: "You have entered a wrong password. Please try again",
                error_common: "An error has occurred"
            }
        },
        kr: {
            translation: {
                label_login: "로그인",
                label_logout: "로그아웃",
                label_home: "대시보드",
                label_membership: "회원 관리",
                hint_pls_enter_id: "아이디를 입력하세요",
                hint_pls_enter_pwd: "비밀번호를 입력하세요",

                error_invalid_email: "Email is invalid. Please try again",
                error_invalid_pwd: "You have entered a wrong password. Please try again",
                error_common: "An error has occurred"
            }
        },
    }
}
);

export default i18n;