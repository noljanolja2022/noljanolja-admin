import axios, { AxiosRequestConfig } from 'axios';
import { StorageKey } from '../util/Constants';
import { Failure, Success } from '../data/model/Result';
import i18n from '../util/translation/LanguageUtil';
import { firebaseAuthInstance } from './FirebaseService';

const axiosConfig: AxiosRequestConfig<any> = {
    baseURL: `${import.meta.env.VITE_NOLJA_ADMIN_SERVER}/api/`,
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
    }, async (error) => {
        if (error.response.data) {
            if (error.response.data.code == 401_003) {
                const originalRequest = error.config;
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    console.log('Token Expired, refreshing token')
                    await firebaseAuthInstance.currentUser?.getIdToken();
                    // Retry the request one time
                    return axiosClient(originalRequest);
                }
                return Promise.reject(error);
            }
            const err = new Error();
            err.name = error.response.data.code;
            err.stack = error;
            err.message = error.response.data.message;
            return new Failure(err);
        }
        return new Failure(error);
    }
)

export default axiosClient;