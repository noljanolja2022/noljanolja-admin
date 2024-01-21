import { AxiosResponse } from "axios";
import { Buffer } from 'buffer';

export const validateEmail = (email?: string) => {
    return email?.match(
        /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
    );
};

export const formatToInt = (input: string) => {
    if (!input) {
        return 0;
    }
    return parseInt(input)
}

export const formatToDecimal = (input: string) => {

    if (!input) {
        return 0;
    }

    return input.replace(/[^.\d]/g, '')
        .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2")
}

export const parseStringToDateTime = (input: string) => {
    if (!input) {
        return new Date();
    }

    return new Date(input);
}

export const formatDateTimeToString = (input: Date) => {
    if (!input) {
        return '';
    }

    let year = input.getFullYear();
    let month = input.getMonth() + 1;
    let monthStr = month.toString();
    if (monthStr.length === 1) monthStr = '0' + monthStr;
    let dt = input.getDate().toString();
    if (dt.length === 1) dt = '0' + dt;
    let hour = input.getHours().toString();
    if (hour.length === 1) hour = '0' + hour;
    let min = input.getMinutes().toString();
    if (min.length === 1) min = '0' + min;

    return `${year}-${monthStr}-${dt} ${hour}:${min}`;
}

export const responseToBase64Img = (res: AxiosResponse<any, any>) => {
    return `data:${res.headers['content-type']};base64,${new Buffer(res.data).toString('base64')}`;
}