import { PaletteColorOptions, PaletteOptions } from "@mui/material/styles";

const redLevel: ColorLevel = {
    50: '#FFF8F8',
    100: '#410E0B',
    200: '#841A1A',
    300: '#BB3030',
    400: '#DB2828',
    500: '#FD1414',
    600: '#FF4242',
    700: '#FF6262',
    800: '#FF9797',
    900: '#FFD2D2',
    1000: '#FFE5E5',
}

const greenLevel: ColorLevel = {
    50: '#B8EB42',
    100: '#AED94A',
    200: '#32C864',
    300: '#2E8646',
    400: '#25A549',
    500: '#29B550',
    600: '#34C85E',
    700: '#46D96F',
    800: '#66E58A',
    900: '#87F2A6',
    1000: '#ACFFC4',
}

const yellow: ColorLevel = {
    50: '#FFFAD0',
    100: '#FFF490',
    200: '#F8DF00',
    300: '#FFC700',
    400: '#FFA800',
    500: '#AC7D0C',
    600: '#FFBA32',
    700: '#FFC960',
    800: '#FFD98E',
    900: '#FFE6B7',
    1000: '#FFF3DC',
}
const blue: ColorLevel = {
    50: '#D3F4FF',
    100: '#084558',
    200: '#095F7B',
    300: '#0B83AA',
    400: '#1097C3',
    500: '#13ACDE',
    600: '#29BEEF',
    700: '#40CBF9',
    800: '#6FDBFF',
    900: '#ACEBFF',
    1000: '#EEFBFF',
}

const gray: ColorLevel = {
    50: '#7f7f7f',
    100: '#727272',
    200: '#656565',
    300: '#585858',
    400: '#4c4c4c',
    500: '#3f3f3f',
    600: '#323232',
    700: '#262626',
    800: '#191919',
    900: '#0c0c0c',
    1000: '#000000',
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
    1000: string
}

declare module '@mui/material/styles' {
    interface CommonColors {
        red: ColorLevel
        green: ColorLevel
        purple: ColorLevel
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
    },
    neutral: {
        main: gray[50],
        light: gray[50],
        dark: gray[100],
        contrastText: 'white'
    },
}

export const LightPalettes: PaletteOptions = {
    ...BasePalettes,
    mode: 'light',
    primary: {
        main: greenLevel[100],
        light: greenLevel[50],
        dark: greenLevel[200],
        contrastText: 'white'
    },
    secondary: {
        main: yellow[100],
        light: yellow[50],
        dark: yellow[300]
    },
}

export const DarkPalettes: PaletteOptions = {
    ...BasePalettes,
    mode: 'dark',
}