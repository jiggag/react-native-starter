import { put, takeLatest, delay } from 'redux-saga/effects';
import { splashAction } from '@actions/root';
import { SPLASH } from '@actions/types';

function* workSplashSaga(action) {
  yield delay(1000);
  yield put(splashAction.SUCCESS());
}

function* watchSplashSaga() {
  yield takeLatest(SPLASH.REQUEST, workSplashSaga);
}

export default [watchSplashSaga];
