import * as Constants from "./constants";

import { takeLatest } from "redux-saga/effects";
import * as Saga from "./fc.saga";

export function* authSaga() {
  yield takeLatest(Constants.LOGIN, Saga.onLogin);
  yield takeLatest(Constants.GET_MYSTORE, Saga.onGetMyStore);
  yield takeLatest(Constants.UPDATE_PROFILE, Saga.updateInfo);
}
