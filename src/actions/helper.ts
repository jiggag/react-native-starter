export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

const action = (type: string, payload = {}) => {
  return { type, payload };
};

export const createAction = (type: { [key: string]: string }) => {
  return {
    REQUEST: (param?: any) => action(type[REQUEST], param),
    SUCCESS: (data?: any) => action(type[SUCCESS], data),
    FAILURE: (error?: any) => action(type[FAILURE], error),
  };
};

export const createRequestType = (req: string): { [key: string]: string } => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    return { ...acc, [type]: `${req}_${type}` };
  }, {});
};
