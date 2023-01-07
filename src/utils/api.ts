import {axiosClient} from './axios';

export type HTTPMethods = 'get' | 'post' | 'patch' | 'delete';
export type HTTPMutationMethods = Exclude<HTTPMethods, 'get'>;

const api = {
  get: <T>(url: string, params?: T) =>
    axiosClient.get<T>(url, {params}).then(res => res.data),
  post: <T>(url: string, data?: T) =>
    axiosClient.post<T>(url, data, {}).then(res => res.data),
  patch: <T>(url: string, data?: T) =>
    axiosClient.patch<T>(url, data, {}).then(res => res.data),
  delete: <T>(url: string, data?: T) =>
    axiosClient.delete<T>(url, {data}).then(res => res.data),
};

export default api;
