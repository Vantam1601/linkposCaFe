import produce from "immer";
import { PayloadAction } from "src/store/types";
import {
  CartConfirmModal,
  InvoiceModal,
  MenuResponseModal,
  StaffModal,
  TableAndMenu,
} from "../modal";
import CartModal from "../modal/cart";

import * as Constants from "./constants";
import { OutletModal } from "../modal/index";

export interface cafeState {
  loading: boolean;
  config: any;
  tableAndMenu: TableAndMenu;
  cart: CartModal;
  cartKitchen: CartConfirmModal[];
  outletCashier: OutletModal[];
  outlet: MenuResponseModal;
  staffs: StaffModal[];
  currentInvoice?: InvoiceModal;
  listToday?: InvoiceModal[];
}
export const initialState: cafeState = {
  loading: false,
  config: {},
  cart: { all: [] },
  tableAndMenu: {
    tables: {},
    products: [],
  },
  cartKitchen: [],
  outletCashier: [],
  outlet: {
    menu: [],
  },
  staffs: [],
  currentInvoice: undefined,
  listToday: undefined,
};

export default function cafeReducer(
  state = initialState,
  action: PayloadAction<string, any, unknown>
) {
  return produce(state, (draft: cafeState) => {
    switch (action.type) {
      case Constants.LOAD_CONFIG_SUCCESS: {
        draft.config = action.payload;
        break;
      }
      case Constants.LOAD_TABLE_SUCCESS: {
        draft.tableAndMenu = action.payload;
        break;
      }
      case Constants.LOAD_CART_SUCCESS: {
        draft.cart = action.payload;
        break;
      }
      case Constants.LOAD_CART_TABLE_SUCCESS: {
        draft.cart[`tb_${action.payload.id}`] = action.payload;
        break;
      }
      case Constants.LOAD_CART_KITCHEN_SUCCESS: {
        draft.cartKitchen = action.payload;
        break;
      }
      case Constants.CASHIER_OUTLET_GENARE_SUCCESS: {
        draft.outletCashier = action.payload;
        break;
      }
      case Constants.GET_MENU_SUCCESS: {
        draft.outlet = action.payload;
        break;
      }
      case Constants.GET_STAFF_SUCCESS: {
        draft.staffs = action.payload;
        break;
      }
      case Constants.GET_INVOICE_SUCCESS: {
        draft.currentInvoice = action.payload;
        break;
      }
      case Constants.GET_CASHIER_TODAY_SUCCESS: {
        draft.listToday = action.payload;
        break;
      }
      default: {
        break;
      }
    }
  });
}
