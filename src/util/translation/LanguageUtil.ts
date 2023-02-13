import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTransation from "./en.json";
import krTransation from "./kr.json";

i18n.use(initReactI18next).init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources: {
        en: { translation: enTransation },
        kr: { translation: krTransation },
    }
}
);

export default i18n;