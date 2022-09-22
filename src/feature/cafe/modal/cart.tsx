type CartModal = {
  all: All[];
  [key: string]: TableCartModal | All[];
};

export default CartModal;

export interface All {
  id: string;
  name: string;
  subtotal: number;
  table_id: string;
  id_user: string;
  fullname: string;
  phone: string;
  caller: Caller;
  checkout: Checkout;
  created_date: Date;
  track_order: TrackOrder;
  total: number;
  status: string;
}

export interface Caller {
  id_user: string;
  fullname: string;
}

export interface Checkout {
  plus: Plus;
  reduce: Plus;
}

export interface Plus {}

export interface TrackOrder {
  [key: string]: ItemTrackOder;
}

export interface ItemTrackOder {
  products: ProductOder[];
  id_user: string;
  fullname: string;
  track: Track[];
  status: string;
}

export interface ProductOder {
  id_product: string;
  quantity: string;
  price: string;
  subtotal: string;
  title: string;
  choice: string;
  note: string;
}

export interface Track {
  date: Date;
  a: string;
  id_user: string;
}

export interface TableCartModal {
  total: number;
  serving: number;
  kitchen_ready: any[];
  kitchen: number;
  name: string;
  id: string;
  created_date: Date;
  customer: null;
}
