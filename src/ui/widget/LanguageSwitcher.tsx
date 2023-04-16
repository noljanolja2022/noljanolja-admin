import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PrimaryToggleButton } from "./MuiButton";

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
            <PrimaryToggleButton value="en"><img src="us.webp" alt="us-flag" /></PrimaryToggleButton>
            <PrimaryToggleButton value="kr"><img src="kr.webp" alt="korea-flag" /></PrimaryToggleButton>
        </ToggleButtonGroup>
    )
}

export default LanguageSwitcher;