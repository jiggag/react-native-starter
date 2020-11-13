import { enableES5 } from 'immer';
import { combineReducers } from 'redux';
import auth, { AuthReducer } from './auth';
import root, { RootReducer } from './root';

interface ReducerProps {
  root: RootReducer;
  auth: AuthReducer;
}

enableES5();

export default combineReducers<ReducerProps>({
  root,
  auth,
});
