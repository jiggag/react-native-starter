import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import root from './root';

const sagas = [...auth, ...root];

export default function* rootSagas() {
  try {
    yield all(sagas.map((saga) => fork(saga)));
  } catch (e) {
    console.error(e);
  }
}
