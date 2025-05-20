import axios from 'axios';
import { BASE_URL } from './apiRoutes';

const API_METHOD = {
  GET: 'get',
  DELETE: 'delete',
  PUT: 'put',
  POST: 'post',
  PATCH: 'patch',
} as const;

type ApiMethod = typeof API_METHOD[keyof typeof API_METHOD];

interface ApiConfig {
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
  isError: boolean;
  data: T;
}

const formatApiResponse = <T>(isError: boolean, data: T = {} as T): ApiResponse<T> => {
  return {
    isError,
    data,
  };
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiResponse = async <T>(promise: Promise<any>): Promise<ApiResponse<T>> => {
  try {
    const response = await promise;
    return formatApiResponse<T>(false, response?.data);
  } catch (error: any) {
    if (error.response) {
      return formatApiResponse<T>(true, error.response?.data);
    } else if (error.request) {
      return formatApiResponse<T>(true, error.request?.data);
    } else {
      return formatApiResponse<T>(true, { message: 'Unknown error', error } as any);
    }
  }
};

const apiService = async <T>(
  method: ApiMethod,
  url: string,
  config: ApiConfig = {},
  data = {},
): Promise<ApiResponse<T>> => {
  const requestConfig = {
    method,
    url,
    ...config,
    data,
  };
  return handleApiResponse<T>(apiClient(requestConfig));
};

// REST API methods:
export const _get = <T>(url: string, config: ApiConfig = {}): Promise<ApiResponse<T>> => {
  return apiService<T>(API_METHOD.GET, url, config);
};

export const _delete = <T>(url: string, config: ApiConfig = {}): Promise<ApiResponse<T>> => {
  return apiService<T>(API_METHOD.DELETE, url, config);
};

export const _put = <T>(url: string, data = {}, config: ApiConfig = {}): Promise<ApiResponse<T>> => {
  return apiService<T>(API_METHOD.PUT, url, config, data);
};

export const _post = <T>(url: string, data = {}, config: ApiConfig = {}): Promise<ApiResponse<T>> => {
  return apiService<T>(API_METHOD.POST, url, config, data);
};

export const _patch = <T>(url: string, data = {}, config: ApiConfig = {}): Promise<ApiResponse<T>> => {
  return apiService<T>(API_METHOD.PATCH, url, config, data);
};