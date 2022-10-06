import { PayloadAction } from "src/store/types";

import { call, put } from "redux-saga/effects";
import { API_ENDPOINT } from "src/helpers/api.endpoint";
import { httpClient } from "src/helpers/httpClient";
import * as Constants from "./constants";
import Toast from "react-native-toast-message";

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

export function* updateInfo(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(
    httpClient.post,
    API_ENDPOINT.updateInfo,
    action.payload,
    false
  );
  //
  console.log("updateInfo order-----", response.data);
  if (response.status === 200) {
    Toast.show({
      type: "success",
      text2: response.data.message ?? "Thực hiện thành công",
    });
    yield put({
      type: Constants.UPDATE_PROFILE_SUCCESS,
      payload: response.data.data,
    });
  }
  action.callback?.();
}
