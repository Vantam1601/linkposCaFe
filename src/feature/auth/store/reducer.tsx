import produce from "immer";
import { PayloadAction } from "src/store/types";
import { ShopModal } from "../model.tsx/common";
import { UserModel } from "../model.tsx/user";

import * as Constants from "./constants";
import { LOAD_TOKEN_SHOP_SUCCESS } from "../../cafe/store/constants";
export interface authState {
  loading: boolean;
  count: number;
  user?: UserModel;
  token?: string;
  myStore?: ShopModal[];
  currentStore?: ShopModal;
  tokenStore?: string;
}
export const initialState: authState = {
  loading: false,
  count: 0,
  user: undefined,
  token: undefined,
  myStore: [],
  currentStore: undefined,
  tokenStore: undefined,
};

export default function authReducer(
  state = initialState,
  action: PayloadAction<string, Record<string, any>, unknown>
) {
  return produce(state, (draft: authState) => {
    switch (action.type) {
      case Constants.LOGIN: {
        draft.loading = true;
        break;
      }
      case Constants.LOGIN_SUCCESS: {
        draft.loading = false;
        draft.token = action.payload?.token;
        draft.user = action.payload?.user;
        break;
      }
      case Constants.LOGIN_ERROR: {
        draft.loading = false;
        break;
      }
      case Constants.GET_MYSTORE_SUCCESS: {
        draft.myStore = action.payload;
        break;
      }
      case Constants.SET_CURRENT_STORE: {
        draft.currentStore = action.payload;
        break;
      }
      case LOAD_TOKEN_SHOP_SUCCESS: {
        draft.tokenStore = action.payload;
        break;
      }

      case Constants.LOGOUT: {
        return { ...initialState };
        break;
      }

      case Constants.UPDATE_PROFILE_SUCCESS: {
        draft.user = action.payload;
        break;
      }

      // ;
      default: {
        break;
      }
    }
  });
}
