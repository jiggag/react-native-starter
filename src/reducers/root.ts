import produce, { Draft } from 'immer';
import { Payload } from '@actions/helper';
import { SPLASH } from '@actions/types';

export interface RootReducer {
  isAppSplash: boolean;
  errorMessage: string;
}

const initialState = {
  isAppSplash: true,
  errorMessage: '',
};

const root = (state: RootReducer = initialState, action: { type: string; payload: Payload<RootReducer> }) => {
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

export default root;
