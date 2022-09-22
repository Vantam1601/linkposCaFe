import { createSlice } from "@reduxjs/toolkit";
import { User } from "src/old/type/User";

type AuthState = {
  user: User | undefined | null;
  userPoint: UserPoint;
  notification: any,
};

export type UserPoint = {
  in: number;
  out: number;
};

const initialState: AuthState = {
  user: undefined,
  notification: {
    total: 0,
    new: 0,
  },
  userPoint: {
    in: 0,
    out: 0,
  },
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setPointUser: (state, action) => {
      state.userPoint = action.payload;
    },
    setUserNotificationReport: (state, action) => {
      state.notification = action.payload;
    },
    logoutActionSlice: (state) => {
      state.user = null;
      state.userPoint = {
        in: 0,
        out: 0,
      };
    },
  },
});

export const {
  setAuthUser,
  logoutActionSlice,
  setPointUser,
  setUserNotificationReport
} = authSlice.actions;
