import i18n from './MultiLang';

export const parseFirebaseErr = (errorCode?: string) => {
    if (!errorCode) {
        return i18n.t("error_common")
    }
    switch (errorCode) {
        case "auth/invalid-email":
            return i18n.t("error_invalid_email")
        case "auth/wrong-password":
            return i18n.t("error_invalid_pwd")
        default:
            return i18n.t("error_common")
    }
} 