import { createTheme } from "@mui/material/styles";
import { DarkPalettes, LightPalettes } from "./ColorPallete";



export const theme = (isDarkMode: boolean) => {
    const theme = createTheme({
        palette: LightPalettes,
        
    })

    return theme;
}