import produce from 'immer';
import { SIGN_UP } from '@actions/types';

const initialState = {
  token: '',
};

const auth = (state = initialState, action: { type: string; payload: any }) => {
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
