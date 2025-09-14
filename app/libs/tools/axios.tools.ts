import { webConfig } from '@repo/config/web.config';
import type { SuccessPayload } from '@repo/type';
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

let axiosInstance: AxiosInstance | null = null;
const baseURL = `${webConfig.apiRoute}`;
const config: AxiosRequestConfig = {
  withCredentials: true,
  baseURL,
  headers: { 'Content-Type': 'application/json', },
};

function getInstance(): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = axios.create(config);
  }
  return axiosInstance;
}

async function get<T>(restApi: string, cfg?: AxiosRequestConfig) {
  return getInstance().get<SuccessPayload<T>>(restApi, cfg);
}

async function post<T, P>(restApi: string, data: P, cfg?: AxiosRequestConfig) {
  return getInstance().post<T, AxiosResponse<SuccessPayload<T>, P>, P>(restApi, data, cfg);
}

async function postWithFile<T, P>(restApi: string, data: P, cfg?: AxiosRequestConfig) {
  return getInstance().post<T, AxiosResponse<SuccessPayload<T>, P>, P>(restApi, data, {
    ...cfg,
    headers: { 'Content-Type': 'multipart/form-data', },
  });
}

async function patch<T, P>(restApi: string, data: P, cfg?: AxiosRequestConfig) {
  return getInstance().patch<T, AxiosResponse<SuccessPayload<T>, P>, P>(restApi, data, cfg);
}

async function put<T, P>(restApi: string, data: P, cfg?: AxiosRequestConfig) {
  return getInstance().put<T, AxiosResponse<SuccessPayload<T>, P>, P>(restApi, data, cfg);
}

async function del<T>(restApi: string, cfg?: AxiosRequestConfig) {
  return getInstance().delete<SuccessPayload<T>>(restApi, cfg);
}

async function getQuery<D>(url: string) {
  const { data, } = await get<D>(url);
  return data;
}

async function postQuery<D, P>(url: string, postData: P) {
  const { data, } = await post<D, P>(url, postData);
  return data;
}

async function patchQuery<D, P>(url: string, patchData: P) {
  const { data, } = await patch<D, P>(url, patchData);
  return data;
}

async function putQuery<D, P>(url: string, putData: P) {
  const { data, } = await put<D, P>(url, putData);
  return data;
}

async function deleteQuery<D>(url: string) {
  const { data, } = await del<D>(url);
  return data;
}

async function deleteWithDataQuery<D, P>(url: string, postData: P) {
  const { data, } = await del<D>(url, { data: postData, });
  return data;
}

async function deletesQuery<D, P>(url: string, deleteData: P) {
  const { data, } = await del<D>(url, { data: deleteData, });
  return data;
}

export const Api = {
  getInstance,
  get,
  post,
  postWithFile,
  patch,
  put,
  delete: del,
  getQuery,
  postQuery,
  patchQuery,
  putQuery,
  deleteQuery,
  deleteWithDataQuery,
  deletesQuery,
};
