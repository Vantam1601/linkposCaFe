import * as Constants from "./constants";

import { takeLatest } from "redux-saga/effects";
import * as Saga from "./fc.saga";

export function* cafeSaga() {
  yield takeLatest(Constants.LOAD_CONFIG, Saga.getConfig);
  yield takeLatest(Constants.LOAD_TABLE, Saga.getMenuAndTable);
  yield takeLatest(Constants.LOAD_CART, Saga.getListCart);
  yield takeLatest(Constants.LOAD_CART_TABLE, Saga.getCartTable);
  yield takeLatest(Constants.LOAD_TOKEN_SHOP, Saga.getTokenShop);
  yield takeLatest(Constants.SUBMIT_ORDER, Saga.submitOrder);
  yield takeLatest(Constants.DELETE_BILL_ORDER, Saga.deleteBillOrder);
  yield takeLatest(Constants.CHANGE_TABLE_ORDER, Saga.changeTableOrder);
  yield takeLatest(Constants.MERGE_TABLE_ORDER, Saga.mergeTableOrder);
  yield takeLatest(Constants.COMPLETE_ORDER, Saga.completeOrder);
  yield takeLatest(Constants.COMPLETE_TAKEAWAY_ORDER, Saga.takeAwayOrder);
  yield takeLatest(Constants.LOAD_CART_KITCHEN, Saga.getListCartKitchen);
  yield takeLatest(Constants.KITCHEN_CONFIRM_ITEM, Saga.kitchenConfirmItem);
  yield takeLatest(
    Constants.KITCHEN_CONFIRM_DELETE_ITEM,
    Saga.kitchenConfirmDeleteItem
  );
  yield takeLatest(Constants.KITCHEN_CONFIRM_OK, Saga.kitchenConfirmFinish);
  yield takeLatest(
    Constants.KITCHEN_CONFIRM_BEFORE_OK,
    Saga.kitchenConfirmBeforeOk
  );
  yield takeLatest(Constants.CASHIER_OUTLET_GENARE, Saga.getListOutletCashier);
  yield takeLatest(Constants.GET_MENU, Saga.getMenu);
  yield takeLatest(Constants.ALLOW_SALE, Saga.allowSale);
  yield takeLatest(Constants.GET_STAFF, Saga.getStaff);
  yield takeLatest(Constants.CALL_STAFF, Saga.confirmTellStaff);
  yield takeLatest(Constants.GET_INVOICE, Saga.getInvoice);
  yield takeLatest(
    Constants.CASHIER_CONFIRM_OUTLET_GENARE,
    Saga.confirmOutletGenaral
  );
  yield takeLatest(Constants.GET_CASHIER_TODAY, Saga.getCashierToday);
}
