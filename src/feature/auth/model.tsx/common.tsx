import { UserModel } from "./user";

export interface DataMyShop {
  pending: any[];
  complete: ShopModal[];
  staff: Staff;
  user: UserModel;
}

export interface ShopModal {
  url: string;
  server: string;
  shop: string;
  id_outlet: string;
  name_outlet: string;
  role: string;
  barcode: string;
  log: string;
  outlets: Outlet[];
  status: Status;
  type: string;
}

export interface Outlet {
  id_outlet: number;
  name: string;
  address: string;
  phone: string;
  created_date: Date;
  email: string;
  id_staff: string;
  image: string;
  open_hour: string;
  lat: string;
  lng: string;
  limit_stock: string;
  fee: string;
  closed: string;
  license_front: string;
  license_back: string;
  image_desc: string;
  description: string;
  url_youtube: string;
  business_hours: string;
  banner_horizontal: string;
  banner_vertical: string;
  thumbnail: string;
  promotion_program: string;
}

export interface Status {
  access: string;
  status: string;
}

export interface Staff {
  staff: any[];
  shoper: Complete[];
  user: UserModel;
}

export interface Report {
  MAIN: number;
  AZSD: number;
}
