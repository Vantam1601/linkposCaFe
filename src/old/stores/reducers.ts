import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.slice";
import { appSlice } from "./app/app.slice";
export const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [appSlice.name]: appSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
