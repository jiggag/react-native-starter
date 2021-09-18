import produce, { Draft } from 'immer';
import { Action } from '@actions/helper';
import { SIGN_UP } from '@actions/types';

export interface AuthReducer {
  token: string;
}

const initialState: AuthReducer = {
  token: '',
};

export const auth = (state = initialState, action: Action<AuthReducer>) => {
  return produce(state, (draft: Draft<AuthReducer>) => {
    switch (action.type) {
      case SIGN_UP.SUCCESS: {
        const { token } = action.payload;
        draft.token = token;
        break;
      }
      case SIGN_UP.REQUEST: {
        draft.token = initialState.token;
        break;
      }
      default:
        return state;
    }
  });
};
