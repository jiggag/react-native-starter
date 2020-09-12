import produce from 'immer';
import { SPLASH } from '@actions/types';

const initialState = {
  isAppSplash: true,
};

const root = (state = initialState, action: { type: string; payload: any }) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SPLASH.SUCCESS:
        draft.isAppSplash = false;
        break;
      default:
        return state;
    }
  });
};

export default root;
