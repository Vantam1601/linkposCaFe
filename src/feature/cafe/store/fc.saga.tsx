import { PayloadAction, RootStateReducer } from "src/store/types";

import { call, put, select } from "redux-saga/effects";
import { API_ENDPOINT } from "src/helpers/api.endpoint";
import { httpClient } from "src/helpers/httpClient";
import * as Constants from "./constants";
import { push, replace } from "src/navigator/RootNavigation";
import { cafeRoutes } from "../router/CafeRouter";
import Toast from "react-native-toast-message";
const selectToken = (state: RootStateReducer) =>
  state.auth.currentStore.access_token;
const selectServer = (state: RootStateReducer) =>
  state.auth.currentStore?.server;

export function* getConfig(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(httpClient.postStore, API_ENDPOINT.config);

  if (response.status === 200) {
    yield put({
      type: Constants.LOAD_CONFIG_SUCCESS,
      payload: response.data,
    });
  }

  action.callback?.();
}

export function* getTokenShop(action: PayloadAction<string, unknown, unknown>) {
  try {
    const access_token = yield select(selectToken);
    const server = yield select(selectServer);

    const response = yield call(
      httpClient.postNoApi,
      server + API_ENDPOINT.get_token_shop + `?session_id=${access_token}`,
      {}
    );

    // console.log("response", response);
    if (response.status === 200) {
      yield put({
        type: Constants.LOAD_TOKEN_SHOP_SUCCESS,
        payload: response.data.token,
      });
    }
    action.callback?.();
  } catch (error) {
    action.callback?.();
  }
}

export function* getMenuAndTable(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(httpClient.postStore, API_ENDPOINT.table);

  if (response.status === 200) {
    yield put({
      type: Constants.LOAD_TABLE_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* getListCart(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(httpClient.postStore, API_ENDPOINT.cart);

  if (response.status === 200) {
    yield put({
      type: Constants.LOAD_CART_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* getCartTable(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.cart_table,
    {
      id: action.payload,
    },
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.LOAD_CART_TABLE_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* submitOrder(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.submit_order,
    action.payload,
    true
  );
  //
  if (response.status === 200) {
    Toast.show({
      type: "success",
      text2: response.data.message ?? "Order thành công",
    });
    yield put({
      type: Constants.SUBMIT_ORDER_SUCCESS,
      payload: response.data,
    });

    yield put({
      type: Constants.LOAD_CART,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* deleteBillOrder(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.delete_bill,
    action.payload,
    true
  );
  //
  // console.log("submit order-----", response);
  if (response.status === 200) {
    Toast.show({
      type: "success",
      text2: response.data.message ?? "Huỷ bill thành công",
    });
    yield put({
      type: Constants.DELETE_BILL_ORDER_SUCCESS,
      payload: response.data,
    });

    yield put({
      type: Constants.LOAD_CART,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* changeTableOrder(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.change_table,
    action.payload,
    true
  );
  //
  // console.log("submit order-----", response);
  if (response.status === 200) {
    Toast.show({
      type: "success",
      text2: response.data.message ?? "Chuyển bàn thành công",
    });
    yield put({
      type: Constants.CHANGE_TABLE_ORDER_SUCCESS,
      payload: response.data,
    });

    yield put({
      type: Constants.LOAD_CART,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* mergeTableOrder(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.merge_table,
    action.payload,
    false
  );
  //
  // console.log("submit order-----", response);
  if (response.status === 200) {
    Toast.show({
      type: "success",
      text2: response.data.message ?? "Gộp bàn thành công",
    });
    yield put({
      type: Constants.MERGE_TABLE_ORDER_SUCCESS,
      payload: response.data,
    });

    yield put({
      type: Constants.LOAD_CART,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* completeOrder(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.complete,
    action.payload,
    true
  );
  //
  if (response.status === 200) {
    Toast.show({
      type: "success",
      text2: response.data.message ?? "Thanh toán thành công",
    });
    yield put({
      type: Constants.COMPLETE_ORDER_SUCCESS,
      payload: response.data,
    });

    yield put({
      type: Constants.LOAD_CART,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* takeAwayOrder(
  action: PayloadAction<string, unknown, unknown>
) {

  // return;
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.takeaway,
    action.payload,
    true
  );

  //
  //
  // alert(JSON.stringify(response.data));

  //
  if (response.status === 200) {
    Toast.show({
      type: "success",
      text2: response.data.message ?? "Thanh toán takeaway thành công",
    });
    yield put({
      type: Constants.COMPLETE_ORDER_SUCCESS,
      payload: response.data,
    });

    yield put({
      type: Constants.LOAD_CART,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* getListCartKitchen(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.kitchen_confirm
  );

  if (response.status === 200) {
    yield put({
      type: Constants.LOAD_CART_KITCHEN_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* kitchenConfirmItem(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.kitchen_confirm_item,
    action.payload,
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.KITCHEN_CONFIRM_ITEM_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: Constants.LOAD_CART_KITCHEN,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* kitchenConfirmDeleteItem(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.kitchen_confirm_delete_item,
    action.payload,
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.KITCHEN_CONFIRM_DELETE_ITEM_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: Constants.LOAD_CART_KITCHEN,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* kitchenConfirmFinish(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.kitchen_confirm_ok,
    action.payload,
    true
  );

  if (response.status === 200) {
    action.callback?.();
    yield put({
      type: Constants.KITCHEN_CONFIRM_OK_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: Constants.LOAD_CART_KITCHEN,
      payload: response.data,
    });
  }
}

export function* kitchenConfirmBeforeOk(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.kitchen_confirm_before_ok,
    action.payload,
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.KITCHEN_CONFIRM_BEFORE_OK_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: Constants.LOAD_CART_KITCHEN,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* getListOutletCashier(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.cashier_outlet_general,
    action.payload,
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.CASHIER_OUTLET_GENARE_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* getMenu(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(httpClient.postStore, API_ENDPOINT.outlet);

  if (response.status === 200) {
    yield put({
      type: Constants.GET_MENU_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* allowSale(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.kitchen_allow_sale,
    action.payload,
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.ALLOW_SALE_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: Constants.GET_MENU,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* getStaff(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(httpClient.postStore, API_ENDPOINT.staff_list);

  if (response.status === 200) {
    yield put({
      type: Constants.GET_STAFF_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* confirmTellStaff(
  action: PayloadAction<string, unknown, unknown>
) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.kitchen_tell,
    action.payload,
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.CALL_STAFF_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

export function* getInvoice(action: PayloadAction<string, unknown, unknown>) {
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.cashier_get_invoice,
    action.payload,
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.GET_INVOICE_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}

const selectOutlet = (state: RootStateReducer) => state.cafe.config.outlet;

export function* confirmOutletGenaral(
  action: PayloadAction<string, unknown, unknown>
) {
  const outlet = yield select(selectOutlet);
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.comfirm_inv,
    action.payload,
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.CASHIER_CONFIRM_OUTLET_GENARE_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: Constants.CASHIER_OUTLET_GENARE,
      payload: {
        id_outlet: outlet?.id_outlet,
      },
    });
  }
  action.callback?.();
}

export function* getCashierToday(
  action: PayloadAction<string, unknown, unknown>
) {
  const outlet = yield select(selectOutlet);
  const response = yield call(
    httpClient.postStore,
    API_ENDPOINT.cashier_today,
    {
      id_outlet: outlet?.id_outlet,
    },
    true
  );

  if (response.status === 200) {
    yield put({
      type: Constants.GET_CASHIER_TODAY_SUCCESS,
      payload: response.data,
    });
  }
  action.callback?.();
}
