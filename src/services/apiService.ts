import apisauce from 'apisauce';
import { BASE_URL } from '@utils/Constants';

export const NETWORK_ERROR = ['NETWORK_ERROR', 'TIMEOUT_ERROR', 'CONNECTION_ERROR'];

export const HEADERS_METHOD = Object.freeze({
  get: 'get',
  post: 'post',
});

export const RETURN_CODE = {
  OK: 200,
  AUTH_ERROR: 403,
  SERVER_ERROR: 500,
};

export const api = apisauce.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 15000,
});

api.addAsyncResponseTransform((response) => async () => {
  if (response.data && response.data.return_code === RETURN_CODE.SERVER_ERROR) {
    response.ok = false;
  }
});

api.addMonitor((response) => {
  if (__DEV__) {
    console.log(JSON.stringify(response));
    console.log(response.config?.data);
  }
});

export const ApiService = async (url: string, method: string, bodyParams: Record<string, unknown>) => {
  switch (method) {
    case HEADERS_METHOD.get:
      return api.get(url, bodyParams);
    case HEADERS_METHOD.post:
      return api.post(url, bodyParams);
    default:
      return null;
  }
};
