import { store } from "src/old/stores";
import { User } from "src/old/type/User";
import { COLOR } from "src/theme/color";
import { storage } from "./storage";
import { useTranslate } from "src/hooks/useTranslate";
import i18next from "i18next";
export const URL = "https://linkpos.giaiphap.xyz/login.php";
export const API_URL = "https://linkpos.giaiphap.xyz/";

const RequestContanst = {
  URL,
  API_URL,
};
//
export const SOCKET_URL = "https://socketio-chat-h9jt.herokuapp.com";
export const API_URL_NO_API = "https://hcm.ahlupos.com";
export const DEFAULT_NO_IMAGE =
  "https://static.thenounproject.com/png/210732-200.png";
export const THUMBNAIL = URL + "thumbnail.png";
export const EMPTY_IMAGE = URL + "images/empty.png";

export const AUTH_HEADER = "auth-token";
export const LOGO = URL + "images/logoapp.png";

export const AVAILABLE_LANGUAGES = ["vi", "en"];
export const LANGUAGE_DEFAULT = "vi";
export const MAX_POINT = 100000;
export const HOT_LINE = "+842871075668";
export const CURRENCY = "VND";
export const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};
export const fetch_lang = (k: string, item: any) => {
  if (!item) return "";
  let l = i18next.language;
  try {
    return item[k + "_" + l] ? item[k + "_" + l] : item[k];
  } catch (e) {}
  return item[k] ? item[k] : k;
};

export const show_address = (item: any) => {
  switch (i18next.language) {
    case "vi":
    case "vn":
      return item?.district + ", " + item?.province;
  }

  return item?.district + ", " + item?.province;
};

export const convertLinkUrlParams = (link: string, path: string) => {
  return link + "?a=" + path;
};
export const convertLinkUrlNoPathParams = (link: string) => {
  return link;
};

export const validURL = (user: User) => {
  var str = "";
  for (var key in user) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + user[key];
  }
  return str;
};

export const serializeQueryFromArray = (
  array: any,
  key: string,
  firstCharacter: string = ""
) => {
  let s = "";
  for (let i = 0; i < array.length; i++) {
    s += `${firstCharacter}${key}=` + array[i];
  }
  return s;
};

export const convertFormDataCommon = async (
  fd: FormData,
  needToken: boolean
): Promise<FormData> => {
  let location = store.getState().app.location;
  if (location) {
    const { latitude, longitude } = location;

    fd.append("lat", latitude);
    fd.append("lng", longitude);
  }

  if (needToken) {
    const [w_t, last_login] = await Promise.all([
      await storage.get("w_t"),
      await storage.get("last_login"),
    ]);
    if (w_t) {
      fd.append("w_t", w_t);
    }

    if (last_login) {
      fd.append("last_login", last_login);
    }
  }
  return fd;
};

export const checkUrlSvg = (url: string) => {
  return url.endsWith(".svg");
};

export enum TypeItem {
  Box,
  Cell,
}

export const sortListItemByDate = (array: any) => {
  if (!array) {
    return [];
  }
  return array;
  return array.sort(function (a: any, b: any) {
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
  });
};
export const renderTextTypeItem = (item: any, intl: any = null) => {
  intl = intl ? intl : useTranslate();
  if (item?.type === "sell") {
    return {
      label: intl.formatMessage({ id: "label:need_sell" }),
      color: COLOR.borderRed,
    };
  }
  if (item?.type === "do") {
    return {
      label: intl.formatMessage({ id: "label:need_do" }),
      color: COLOR.main_color,
    };
  }
  if (item?.type === "buy") {
    return {
      label: intl.formatMessage({ id: "label:need_buy" }),
      color: COLOR.borderGreen,
    };
  }
  if (item?.type === "find") {
    return {
      label: intl.formatMessage({ id: "label:need_find" }),
      color: COLOR.borderGreen,
    };
  }
};

export const renderPrice = (item: any) => {
  const intl = useTranslate();
  if (!item.price_from && !item.price_to) {
    return intl.formatMessage({ id: "label:need_deal" });
  }
  if (!item.price_from && item.price_to) {
    return amountFormat(item.price_to);
  }
  if (item.price_from && !item.price_to) {
    return amountFormat(item.price_from);
  }
  return amountFormat(item.price_from) + " - " + amountFormat(item.price_to);
};

export const convertFormDataCommonFromUser = async (
  fd: FormData,
  user: any
): Promise<FormData> => {
  if (user) {
    for (var key in user) {
      console.log(user[key]);
      fd.append(key, user[key]);
    }
  }
  return fd;
};
export const amountFormat = (num: any): string => {
  if (!num) return num;
  const _dot = ",";

  let newNum = "";
  if (typeof num === "string") {
    const value = parseInt(num.replace(/\D/g, ""));
    if (isNaN(value)) {
      newNum = "";
    } else {
      newNum = value.toString();
    }
  } else {
    newNum = num.toString();
  }
  newNum = newNum.replace(/\./g, "");
  const parts = newNum.toString().split(_dot);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, _dot);
  return parts.join(_dot);
};
