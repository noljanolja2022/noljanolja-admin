import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "./mui/ToggleButton";

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [curLang, setCurLang] = useState(i18n.language);

    useEffect(() => {
        if (curLang !== i18n.language) {
            i18n.changeLanguage(curLang);
        }
    }, [curLang])

    const onChangeLanguage = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setCurLang(newAlignment);
    };

    return (
        <ToggleButtonGroup
            size="small"
            value={curLang}
            exclusive
            onChange={onChangeLanguage}
            aria-label="Language Switcher">
            <ToggleButton value="en"><img src="us.webp" alt="us-flag" /></ToggleButton>
            <ToggleButton value="kr"><img src="kr.webp" alt="korea-flag" /></ToggleButton>
        </ToggleButtonGroup>
    )
}

export default LanguageSwitcher;