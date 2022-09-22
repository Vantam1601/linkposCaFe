export type Conscious = {
  name: string;
  id: any;
};
export type District = {
  name: string;
  id: any;
};
export type HistoryToday = {
  created_date: string;
  id: number;
  point: string;
  ref: number;
  status: string;
  title: number;
  type: number;
};
export type HistoryNeed = {
  id: string;
  image: string;
  point: string;
  status: string;
  title: string;
  type: string;
};
export type HistoryWork = {
  created_date: string;
  id: string;
  image: string;
  ip: string;
  note: string;
  ref: string;
  title: string;
  type: string;
};
export type ListGift = {
  address: string;
  created_date: number;
  description: string;
  id: number;
  image: string;
  ip: number;
  lat: number;
  lng: string;
  modified_date: number;
  phone: string;
  point: number;
  ref: string;
  title: number;
  view: number;
};

export interface TodayCoupon {
  id: string;
  reach: string;
  title: string;
  image: string;
  percent: string;
  country: string;
  province: string;
  district: string;
  ref: string;
  id_user: string;
  created_date: string;
  lat: string;
  lng: string;
  ip: string;
  timer: string;
  status: string;
  view: string;
}

export interface Slide {
  url: string;
  image: string;
}
export interface SlideIntro {
  title: string;
  image: string;
}
export interface Youknow {
  id: string;
  category: string;
  title: string;
  phone: string;
  image: string;
  country: string;
  province_id: string;
  district_id: string;
  ward_id: string;
  street?: any;
  address?: any;
  featured: string;
  ref: string;
  created_date: string;
  lat?: any;
  lng?: any;
  ip?: any;
  status: string;
  click: string;
  timer: string;
  url: string;
  _order: string;
}

export interface TodayNeed {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  description_modified?: any;
  phone: string;
  image: string;
  gallery: string;
  price_from: string;
  price_to: string;
  country: string;
  province_id: string;
  district_id: string;
  ward_id: string;
  street: string;
  ref: string;
  created_date: string;
  modified_date: string;
  lat: string;
  lng: string;
  ip: string;
  timer: string;
  status: string;
  view: string;
  view_users: string;
  type: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  liked: string;
  saved: string;
  _order: string;
  updates?: any;
  ontop: string;
  ontop_date: string;
  km: string;
}

export interface FeatureNeed {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  description_modified?: any;
  phone: string;
  image: string;
  gallery: string;
  price_from: string;
  price_to: string;
  country: string;
  province_id: string;
  district_id: string;
  ward_id: string;
  street: string;
  ref: string;
  created_date: string;
  modified_date: string;
  lat: string;
  lng: string;
  ip: string;
  timer: string;
  status: string;
  view: string;
  view_users: string;
  type: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  liked: string;
  saved: string;
  _order: string;
  updates?: any;
  ontop: string;
  ontop_date: string;
  km: string;
}

export interface TodayShop {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  slug?: any;
  phone: string;
  image: string;
  gallery: string;
  country: string;
  district: string;
  province: string;
  ward: string;
  province_id: string;
  district_id: string;
  ward_id: string;
  street: string;
  address: string;
  featured: string;
  ref: string;
  created_date: string;
  lat: string;
  lng: string;
  ip: string;
  status: string;
  click: string;
  timer: string;
  time: string;
  url: string;
  open: string;
  description: string;
  _order: string;
  view: string;
  type: string;
  comments?: any;
  updates: string;
  products: string;
  products_update: string;
  history_update: string;
  km: string;
}

export interface ShopFeatured {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  slug: string;
  phone: string;
  image: string;
  gallery: string;
  country: string;
  district: string;
  province: string;
  ward: string;
  province_id: string;
  district_id: string;
  ward_id: string;
  street: string;
  address: string;
  featured: string;
  ref: string;
  created_date: string;
  lat: string;
  lng: string;
  ip: string;
  status: string;
  click: string;
  timer: string;
  time: string;
  url: string;
  open: string;
  description: string;
  _order: string;
  view: string;
  type: string;
  comments: string;
  updates: string;
  products: string;
  products_update: string;
  history_update: string;
}

export interface HoChiMinh {
  label: string;
  total: number;
}

export interface HaNoi {
  label: string;
  total: number;
}

export interface AnGiang {
  label: string;
  total: number;
}

export interface BaRiaVungTau {
  label: string;
  total: number;
}

export interface BacGiang {
  label: string;
  total: number;
}

export interface BacKan {
  label: string;
  total: number;
}

export interface BacLieu {
  label: string;
  total: number;
}

export interface BacNinh {
  label: string;
  total: number;
}

export interface BenTre {
  label: string;
  total: number;
}

export interface BinhDinh {
  label: string;
  total: number;
}

export interface BinhDuong {
  label: string;
  total: number;
}

export interface BinhPhuoc {
  label: string;
  total: number;
}

export interface BinhThuan {
  label: string;
  total: number;
}

export interface CaMau {
  label: string;
  total: number;
}

export interface CanTho {
  label: string;
  total: number;
}

export interface CaoBang {
  label: string;
  total: number;
}

export interface DaNang {
  label: string;
  total: number;
}

export interface DakLak {
  label: string;
  total: number;
}

export interface DakNong {
  label: string;
  total: number;
}

export interface DienBien {
  label: string;
  total: number;
}

export interface DongNai {
  label: string;
  total: number;
}

export interface DongThap {
  label: string;
  total: number;
}

export interface GiaLai {
  label: string;
  total: number;
}

export interface HaGiang {
  label: string;
  total: number;
}

export interface HaNam {
  label: string;
  total: number;
}

export interface HaTinh {
  label: string;
  total: number;
}

export interface HaiDuong {
  label: string;
  total: number;
}

export interface HaiPhong {
  label: string;
  total: number;
}

export interface HauGiang {
  label: string;
  total: number;
}

export interface HoaBinh {
  label: string;
  total: number;
}

export interface HungYen {
  label: string;
  total: number;
}

export interface KhanhHoa {
  label: string;
  total: number;
}

export interface KienGiang {
  label: string;
  total: number;
}

export interface KonTum {
  label: string;
  total: number;
}

export interface LaiChau {
  label: string;
  total: number;
}

export interface LamDong {
  label: string;
  total: number;
}

export interface LangSon {
  label: string;
  total: number;
}

export interface LaoCai {
  label: string;
  total: number;
}

export interface LongAn {
  label: string;
  total: number;
}

export interface NamDinh {
  label: string;
  total: number;
}

export interface NgheAn {
  label: string;
  total: number;
}

export interface NinhBinh {
  label: string;
  total: number;
}

export interface NinhThuan {
  label: string;
  total: number;
}

export interface PhuQuoc {
  label: string;
  total: number;
}

export interface PhuTho {
  label: string;
  total: number;
}

export interface PhuYen {
  label: string;
  total: number;
}

export interface QuangBinh {
  label: string;
  total: number;
}

export interface QuangNam {
  label: string;
  total: number;
}

export interface QuangNgai {
  label: string;
  total: number;
}

export interface QuangNinh {
  label: string;
  total: number;
}

export interface QuangTri {
  label: string;
  total: number;
}

export interface SocTrang {
  label: string;
  total: number;
}

export interface SonLa {
  label: string;
  total: number;
}

export interface TayNinh {
  label: string;
  total: number;
}

export interface ThaiBinh {
  label: string;
  total: number;
}

export interface ThaiNguyen {
  label: string;
  total: number;
}

export interface ThanhHoa {
  label: string;
  total: number;
}

export interface ThuaThienHue {
  label: string;
  total: number;
}

export interface TienGiang {
  label: string;
  total: number;
}

export interface TraVinh {
  label: string;
  total: number;
}

export interface TuyenQuang {
  label: string;
  total: number;
}

export interface VinhLong {
  label: string;
  total: number;
}

export interface VinhPhuc {
  label: string;
  total: number;
}

export interface YenBai {
  label: string;
  total: number;
}
export interface HomeData {
  TodayCoupon: TodayCoupon[];
  TodayEvent: any[];
  slide: Slide[];
  youknow: Youknow[];
  HomePoint: number;
  TodayNeed: TodayNeed[];
  FeatureNeed: FeatureNeed[];
  TodayShop: TodayShop[];
  ShopFeatured: ShopFeatured[];
  CouponCountry: any;
  BonusPromotion?: any;
  WifiNear:any;
  faq: faq[]
}
export interface faq {
  title: string,
  description: string
}
export interface ListPromotion {
  id: string;
  image: string;
  lat: string;
  lng: string;
  percent: string;
  timer: string;
  title: string;
}

export interface LocationPromotion {
  label: string;
  total: number;
}
export interface Promotion {
  country: any;
  list: ListPromotion[];
}
export interface ShortTerm {
  TodayCoupon: any;
  cate: any[];
  latest: any[];
  seafood: any[];
  slide: Slide[]
}
