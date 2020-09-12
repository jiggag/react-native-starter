import { combineReducers } from 'redux';
import { enableES5 } from 'immer';
import root from './root';
import auth from './auth';

enableES5();

export default combineReducers({
  root,
  auth,
});
