import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/AuthStore';
import i18n from '../util/translation/LanguageUtil';
import { firebaseAuthInstance } from './FirebaseService';

const axiosConfig: AxiosRequestConfig<any> = {
    baseURL: `${import.meta.env.VITE_ADMIN_SERVER}/api/`,
    // withCredentials: true
}
const axiosClient = axios.create(axiosConfig);
axiosClient.interceptors.request.use(
    config => {
        if (window !== undefined) {
            const token = useAuthStore.getState().bearer
            const bearer = `Bearer ${token}`
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
                    const newToken = await firebaseAuthInstance.currentUser?.getIdToken(true);
                    if (newToken) {
                        useAuthStore.getState().setBearer(newToken)
                    }
                    // Retry the request one time
                    return axiosClient(originalRequest);
                }
                return Promise.reject(error);
            }
            return Promise.resolve(error.response.data);
        }
        return Promise.reject(error);
    }
)

export default axiosClient;