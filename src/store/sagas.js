import { all } from "redux-saga/effects";
import { authSaga } from "src/feature/auth/store/saga";
import { cafeSaga } from "src/feature/cafe/store/saga";

export default function* rootSaga() {
  // console.log("vao sagaa")
  yield all([authSaga(), cafeSaga()]);
}
