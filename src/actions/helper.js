export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

const action = (type, payload = {}) => {
  return { type, payload };
};

export const createAction = (type) => {
  return {
    REQUEST: (param) => action(type[REQUEST], param),
    SUCCESS: (data) => action(type[SUCCESS], data),
    FAILURE: (error) => action(type[FAILURE], error),
  };
};

export const createRequestType = (req) => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${req}_${type}`;
    return acc;
  }, {});
};
