import axios, { AxiosRequestConfig } from 'Axios';

const axiosConfig: AxiosRequestConfig<any> = {
    // baseURL: `${process.env.REACT_APP_SERVER_PROTOCOL}://${process.env.REACT_APP_SERVER_HOST}/api/`,
    // withCredentials: true
}

const axiosClient = axios.create();

export default axiosClient;