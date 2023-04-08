import axios, { AxiosRequestConfig } from 'axios';
import { StorageKey } from '../util/Constants';
import { Failure, Success } from '../data/model/Result';
import i18n from '../util/translation/LanguageUtil';

const axiosConfig: AxiosRequestConfig<any> = {
    baseURL: `${process.env.REACT_APP_NOLJA_ADMIN_SERVER}/api/`,
    // withCredentials: true
}
const axiosClient = axios.create(axiosConfig);
axiosClient.interceptors.request.use(
    config => {
        if (window !== undefined) {
            const bearer = `Bearer ${localStorage.getItem(StorageKey.bearer)}`
            if (bearer) {
                config.headers['Authorization'] = bearer
            }
        }
        config.headers['Accept-Language'] = i18n.language;
        return config;
    }, error => {
        return Promise.reject(error);
    }
)

axiosClient.interceptors.response.use(
    response => {
        return response;
    }, error => {
        if (error.response.data) {
            const err = new Error(error.response.data.message);
            err.name = error.response.data.code;
            err.stack = error;
            return new Failure(err);
        }
        return new Failure(error);
    }
)

export default axiosClient;