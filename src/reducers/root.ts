import produce from 'immer';
import { SPLASH } from '@actions/types';

export interface RootReducer {
  isAppSplash: boolean;
}

const initialState = {
  isAppSplash: true,
};

const root = (state: RootReducer = initialState, action: { type: string; payload: never }) => {
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
