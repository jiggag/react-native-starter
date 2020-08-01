import { all, fork } from 'redux-saga/effects';
import auth from './auth';

const sagas = [...auth];

export default function* rootSagas() {
  try {
    yield all(sagas.map((saga) => fork(saga)));
  } catch (e) {
    console.error(e);
  }
}
