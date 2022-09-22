export interface ProductModal {
  id: number;
  title: string;
  price: number;
  category: string;
  unit: string;
  created_date: string;
  status: string;
  id_outlet: string;
  image: string;
  type: string;
  allow_sale: string;
  modified_date: string;
  desc: string;
  combo: string;
  limit_stock: string;
  barcode: string;
  weight: string;
  height: string;
  length: string;
  brand: string;
  original: string;
  width: string;
  id_parent: string;
  price_off: string;
  cost: string;
  exhibition: string;
  barcode_in: string;
  featured: string;
  cost_log: string;
}

export interface TableModal {
  id: number;
  name: string;
  id_region: string;
}
export interface AreaTable {
  id: string;
  name: string;
  child: TableModal[];
}

export interface TableDataModal {
  [key: string]: AreaTable;
}

export interface TableAndMenu {
  tables: TableDataModal;
  products: ProductModal[];
}

export interface CartConfirmModal {
  created_date: string;
  id: string;
  id_table: string;
  name: string;
  products: ProductModal[];
  status: string;
  track: any[];
}

export interface OutletModal {
  id_inv: number;
  barcode: string;
  ref: string;
  total: string;
  status: string;
  created_date: string;
  id_outlet: number;
  payment: string;
  id_staff: number;
  id_customer: string;
  log: string;
  table_id: string;
  id_tran: string;
  completed_date: string;
  app: string;
  phone_customer: string;
  fullname_customer: string;
  point: string;
  id: string;
  note: string;
  confirmed: string;
  after_total: string;
  fee: string;
  id_nvgh: string;
  id_kbh: string;
  id_ship: string;
  number_people: string;
  discount: string;
  discount_type: string;
  name_outlet: string;
  name: string;
}
export interface MenuModal {
  id: number;
  title: string;
  price: number;
  category: string;
  unit: string;
  created_date: string;
  status: string;
  id_outlet: string;
  image: string;
  type: string;
  allow_sale: number;
  modified_date: string;
  desc: string;
  combo: string;
  limit_stock: string;
  barcode: string;
}

export interface MenuResponseModal {
  id_outlet?: number;
  name?: string;
  address?: string;
  phone?: string;
  created_date?: string;
  email?: string;
  id_staff?: string;
  image?: string;
  open_hour?: string;
  lat?: string;
  lng?: string;
  limit_stock?: string;
  fee?: string;
  closed?: string;
  license_front?: string;
  license_back?: string;
  image_desc?: string;
  description?: string;
  url_youtube?: string;
  business_hours?: string;
  banner_horizontal?: string;
  banner_vertical?: string;
  thumbnail?: string;
  promotion_program?: string;
  menu: MenuModal[];
}

export interface StaffModal {
  email: string;
  phone: string;
  username: string;
  role: string;
  id_outlet: number;
  salary: number;
  shift: string;
  avatar: string;
  permission: string;
  id_user: string;
  cmnd: string;
  fullname: string;
  bank_name: string;
  bank_account: string;
  role_staff: string;
  name: string;
  in: string;
  out: string;
}

export interface MenuInvoiceModal {
  id: number;
  id_inv: number;
  id_menu: string;
  quantity: number;
  price: string;
  subtotal: string;
  exchange: string;
  menu_combine: string;
  price_discount: string;
  cost: string;
  inv_discount: string;
  menuname: string;
}
export interface InvoiceModal {
  id_inv: number;
  barcode: string;
  ref: string;
  total: string;
  status: string;
  created_date: string;
  id_outlet: number;
  payment: string;
  id_staff: number;
  id_customer: string;
  log: string;
  table_id: string;
  id_tran: string;
  completed_date: string;
  app: string;
  phone_customer: string;
  fullname_customer: string;
  point: string;
  id: string;
  note: string;
  confirmed: string;
  after_total: string;
  fee: string;
  id_nvgh: string;
  id_kbh: string;
  id_ship: string;
  number_people: string;
  discount: string;
  discount_type: string;
  fullname: string;
  name: string;
  listmenu: MenuInvoiceModal[];
}
