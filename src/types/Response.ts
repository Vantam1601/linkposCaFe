export type ResponseBase<T = unknown, D = any> = {
  code: number;
  data: D;
  message: string;
  id_user: string;
  fullname: string;
  id_password: boolean;
  error?: string;
  token?: string;
} & T;
