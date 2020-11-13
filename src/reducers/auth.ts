import produce, { Draft } from 'immer';
import { Payload } from '@actions/helper';
import { SIGN_UP } from '@actions/types';

export interface AuthReducer {
  token: string;
}

const initialState = {
  token: '',
};

const auth = (state: AuthReducer = initialState, action: { type: string; payload: Payload<AuthReducer> }) => {
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

export default auth;
