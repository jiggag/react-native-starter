import { put, takeLatest, call } from 'redux-saga/effects';
import { signUpAction } from '@actions/auth';
import { SIGN_UP } from '@actions/types';
import { postUser, PostUserResponse } from '@services/authController';

function* workSaga() {
  const response: PostUserResponse = yield call(postUser);
  if (response.ok && response.data) {
    const { token } = response.data;
    yield put(
      signUpAction.SUCCESS({
        token,
      }),
    );
  } else {
    yield put(
      signUpAction.FAILURE({
        errorMessage: response.problem,
      }),
    );
  }
}

function* watchSaga() {
  yield takeLatest(SIGN_UP.REQUEST, workSaga);
}

export default [watchSaga];
