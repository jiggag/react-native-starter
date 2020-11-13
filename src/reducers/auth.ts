import produce from 'immer';
import { SIGN_UP } from '@actions/types';

export interface AuthReducer {
  token: string;
}

const initialState = {
  token: '',
};

const auth = (state: AuthReducer = initialState, action: { type: string; payload: never }) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SIGN_UP.SUCCESS:
        draft.token = action.payload;
        break;
      case SIGN_UP.REQUEST:
        draft.token = initialState.token;
        break;
      default:
        return state;
    }
  });
};

export default auth;
