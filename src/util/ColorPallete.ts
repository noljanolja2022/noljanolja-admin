import { PaletteColorOptions, PaletteOptions } from "@mui/material/styles";

const redLevel: ColorLevel = {
    50: "#FFEBEE",
    100: "#FFCDD2",
    200: "#EF9A9A",
    300: "#E57373",
    400: "#EF5350",
    500: "#F44336",
    600: "#E53935",
    700: "#D32F2F",
    800: "#C62828",
    900: "#B71C1C"
}

const greenLevel: ColorLevel = {
    50: "#E8F5E9",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#4CAF50",
    600: "#43A047",
    700: "#388E3C",
    800: "#2E7D32",
    900: "#1B5E20"
}

const yellow: ColorLevel = {
    50: "#FFFDE7",
    100: "#FFF9C4",
    200: "#FFF59D",
    300: "#FFF176",
    400: "#FFEE58",
    500: "#FFEB3B",
    600: "#FDD835",
    700: "#FBC02D",
    800: "#F9A825",
    900: "#F57F17"
}
const blue: ColorLevel = {
    50: "#E3F2FD",
    100: "#BBDEFB",
    200: "#90CAF9",
    300: "#64B5F6",
    400: "#42A5F5",
    500: "#2196F3",
    600: "#1E88E5",
    700: "#1976D2",
    800: "#1565C0",
    900: "#0D47A1"
}

const gray: ColorLevel = {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121"
};

interface ColorLevel {
    50: string
    100: string,
    200: string,
    300: string,
    400: string,
    500: string,
    600: string,
    700: string,
    800: string,
    900: string,
}

declare module '@mui/material/styles' {
    interface CommonColors {
        red: ColorLevel
        green: ColorLevel
        blue: ColorLevel
        yellow: ColorLevel
        gray: ColorLevel
    }

    interface PaletteOptions {
        neutral: PaletteColorOptions
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

const BasePalettes: PaletteOptions = {
    common: {
        red: redLevel,
        green: greenLevel,
        yellow: yellow,
        gray: gray,
        blue: blue
    },
    neutral: {
        main: gray[500],
        light: gray[400],
        dark: gray[700],
        contrastText: 'white'
    },
}

export const LightPalettes: PaletteOptions = {
    ...BasePalettes,
    mode: 'light',
    primary: {
        main: greenLevel[500],
        light: greenLevel[400],
        dark: greenLevel[700],
        contrastText: 'white'
    },
    secondary: {
        main: yellow[500],
        light: yellow[400],
        dark: yellow[700]
    },
}

export const DarkPalettes: PaletteOptions = {
    ...BasePalettes,
    mode: 'dark',
}