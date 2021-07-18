import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

interface ApiClient {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, data: Object, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  patch: <T>(url: string, data: Object, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

export const apiClient: ApiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => {
    return axios.get<T>(url, config);
  },
  post: <T>(url: string, data: Object, config?: AxiosRequestConfig) => {
    return axios.post<T>(url, data, config);
  },
  patch: <T>(url: string, data: Object, config?: AxiosRequestConfig) => {
    return axios.patch<T>(url, data, config);
  },
};
