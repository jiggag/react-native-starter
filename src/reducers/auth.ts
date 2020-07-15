import { SIGN_UP } from '../actions/types';

const auth = (state = { token: '' }, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SIGN_UP.SUCCESS:
    case SIGN_UP.REQUEST:
      return { token: 'test' };
    default:
      return state;
  }
};

export default auth;
