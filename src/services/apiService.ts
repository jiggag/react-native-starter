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

const ApiService = async (URL: string, method: string, bodyParams: Record<string, unknown>) => {
  let response = null;
  switch (method) {
    case HEADERS_METHOD.get:
      response = await api.get(URL, bodyParams);
      break;
    case HEADERS_METHOD.post:
      response = await api.post(URL, bodyParams);
      break;
    default:
  }
  return response;
};

export default ApiService;
