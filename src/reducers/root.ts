import produce, { Draft } from 'immer';
import { Action } from '@actions/helper';
import { SPLASH } from '@actions/types';

export interface RootReducer {
  isAppSplash: boolean;
  errorMessage: string | null;
}

const initialState: RootReducer = {
  isAppSplash: true,
  errorMessage: null,
};

export const root = (state = initialState, action: Action<RootReducer>) => {
  return produce(state, (draft: Draft<RootReducer>) => {
    switch (action.type) {
      case SPLASH.SUCCESS:
        draft.isAppSplash = false;
        break;
      default:
        return state;
    }
  });
};
