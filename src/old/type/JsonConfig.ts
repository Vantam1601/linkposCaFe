export interface JsonConfig {
  hotline: string;
  site_title: string;
  app: string;
  env?: any;
  url: string;
  api: string;
  admin_path: string;
  logo1: string;
  logo: string;
  smtp?: any;
  smtp_web?: any;
  admin_email: string;
  database?: any;
  maintain?: any;
  notification?: any;
  members?: any;
  need?: any;
  ship?: any;
  AhluADS?: any;
  status?: any;
  shop?: any;
  post?: any;
  beta?: any;
}
export interface userLocation {
  accuracy: any | undefined | null;
  altitude: any | undefined | null;
  altitudeAccuracy: any | undefined | null;
  heading: any | undefined | null;
  latitude: any | undefined | null;
  longitude: any | undefined | null;
  speed: any | undefined | null;
}
