import { put, takeLatest, delay } from 'redux-saga/effects';
import { signUpAction } from '@actions/auth';
import { SIGN_UP } from '@actions/types';

function* workSaga(action) {
  yield delay(1000);
  const response = { ok: true, data: 'token-test' };
  if (response.ok) {
    yield put(signUpAction.SUCCESS(response.data));
  } else {
    yield put(signUpAction.FAILURE(response.problem));
  }
}

function* watchSaga() {
  yield takeLatest(SIGN_UP.REQUEST, workSaga);
}

export default [watchSaga];
