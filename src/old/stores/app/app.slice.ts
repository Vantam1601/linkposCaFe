import { createSlice } from "@reduxjs/toolkit";
import { JsonConfig, userLocation } from "src/old/type/JsonConfig";

type AuthState = {
  json: JsonConfig | undefined | null;
  appJson: any;
  location: userLocation | undefined | null;
};
const initialState: AuthState = {
  json: undefined,
  appJson: undefined,
  location: undefined,
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.json = action.payload;
    },
    setAppConfig: (state, action) => {
      state.appJson = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setConfig, setLocation, setAppConfig } = appSlice.actions;
