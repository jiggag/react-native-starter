import { all, fork } from 'redux-saga/effects';
import _map from 'lodash/map';
import auth from './auth';
import root from './root';

const sagas = [...auth, ...root];

export default function* rootSagas() {
  try {
    yield all(_map(sagas, (saga) => fork(saga)));
  } catch (e) {
    console.error(e);
  }
}
