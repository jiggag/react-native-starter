import { SIGN_UP } from '../actions/types';

const auth = (state = { token: null }, action) => {
  switch (action.type) {
    case SIGN_UP.SUCCESS:
    case SIGN_UP.REQUEST:
      return { token: 'test' };
  }
  return state;
};

export default auth;
