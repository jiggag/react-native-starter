import _reduce from 'lodash/reduce';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export type Payload<T = Record<string, string | number>> = T;
export interface Action<T> {
  type: string;
  payload: T;
}
const action = (type: string, payload: Payload = {}): Action<Payload> => {
  return { type, payload };
};

export const createAction = (type: Record<string, string>) => {
  return {
    REQUEST: (param?: Payload) => action(type[REQUEST], param),
    SUCCESS: (data?: Payload) => action(type[SUCCESS], data),
    FAILURE: (error?: Payload) => action(type[FAILURE], error),
  };
};

export const createRequestType = (req: string): Record<string, string> => {
  return _reduce(
    [REQUEST, SUCCESS, FAILURE],
    (acc: Record<string, string>, type: string) => {
      return { ...acc, [type]: `${req}_${type}` };
    },
    {},
  );
};
