import { httpClient } from "src/helpers/httpClient";
import * as END_POINT from "src/helpers/api.endpoint";
import { convertLinkUrlParams } from "src/helpers/constants";

export const login = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.user_login),
    data
  );
};
export const registers = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.user_register),
    data
  );
};
export const forgotPassword = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.otp, END_POINT.otp_reset_password),
    data
  );
};
export const forgotEmail = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.otp, END_POINT.otp_reset_email),
    data
  );
};

export const profile = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.user_profile),
    data
  );
};

export const pointReport = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.point, END_POINT.point_report),
    data
  );
};
