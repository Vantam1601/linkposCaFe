import { PayloadAction } from "src/store/types";

import { call, put } from "redux-saga/effects";
import { API_ENDPOINT } from "src/helpers/api.endpoint";
import { httpClient } from "src/helpers/httpClient";
import * as Constants from "./constants";

export function* onLogin(action: PayloadAction<string, unknown, unknown>) {
  if (Constants.LOGIN === action.type) {
    const body = action.payload;
  }
}

export function* onGetMyStore(action: PayloadAction<string, unknown, unknown>) {
  // const body = action.payload;
  const response = yield call(httpClient.post, API_ENDPOINT.my_shop, {}, false);
  // alert(100);
  // console.log("response", response);
  if (response.status === 200) {
    yield put({
      type: Constants.GET_MYSTORE_SUCCESS,
      payload: response.data,
    });
  }
  if (action.callback) {
    action.callback?.();
  }
}
