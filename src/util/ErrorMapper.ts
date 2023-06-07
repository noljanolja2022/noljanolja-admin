import { t } from "i18next";

export const parseFirebaseErr = (errorCode?: string) => {
    if (!errorCode) {
        return t("error_common")
    }
    switch (errorCode) {
        case "auth/invalid-email":
            return t("error_invalid_email")
        case "auth/wrong-password":
            return t("error_invalid_pwd")
        default:
            return t("error_common")
    }
} 