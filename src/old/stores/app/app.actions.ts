import { AppThunk, store } from "src/old/stores";
import Toast from "react-native-toast-message";
import { httpClient } from "src/helpers/httpClient";

import {
  updateProfile,
  verifyEmail,
  updatePass,
  getData,
  getHistoryToday,
  postLoadPoint,
  getListGift,
  postConfirmGift,
  postContinueWithdrawBank,
  postContinueWithdrawMomo,
  postConfirmWithdraw,
  postUpdateOtp,
  getListCountry,
  getListHistoryNeed,
  getListHistoryWork,
  deleteHistoryNeed,
  getDetailHistoryNeed,
  updatePostHistory,
  createPostHistoryNeed,
  verifyKYC,
  getListHistoryShop,
  getDetailShop,
  getPromotion,
  getDetailPromotion,
  postCreateEmergency,
  getShortTerm,
  getCategoryNeed,
  getSubCategoryNeed,
  getCategoryHomeService,
  getCategoryHomeServiceChild,
  getSubCategoryNeedShop,
  getCategoryStoreService,
  getCategoryFood,
  getCategoryNeedJob,
  getCategoryProductService,
  deleteHistoryShop,
  updatePostShopHistory,
  getCategorySOS,
  postCreateShop,
  getMemberGroup,
  getEvent,
  getNewByCategory,
  getUserNotification,
  getUserNotificationReport,
  postFeedBack,
  getListGame,
  getListWifi,
  getDetailWifi,
  getInforWifi,
  getCountry,
  updateHistoryshop,
  getCountryNeed,
  getAds,
  getCountryPromotion,
  getEmergencyItem,
  postDeviceInfo,
  likePost,
  getCodePromotion,
  likeShop,
  saveShop,
  checkIn,
  getNotificationLastest,
  searchShop,
  searchNeed,
  commentShop,
  postCommentShopNew,
  postLikeCommentShopNew,
  postFixCommentShopNew,
  postDeleteCommentShopNew,
} from "./app.service";
import { removeToken, saveToken, storage } from "src/helpers/storage";
import {
  convertFormDataCommon,
  convertFormDataCommonFromUser,
} from "src/helpers/constants";
import { navigate } from "src/navigator/RootNavigation";
import { AppRoutes } from "src/navigator/app-routes";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import _ from "lodash";
import { string } from "yup/lib/locale";
import { setAppConfig, setConfig } from "./app.slice";
import { User } from "src/old/type/User";
import { setUserNotificationReport } from "../auth/auth.slice";
import {site_url} from "src/helpers/config";
import i18next from 'i18next'; 

export const getJsonConfigAction = (): AppThunk => async (dispatch) => {
  let url = site_url("config.json");
  let response = await fetch(url);
  let json = await response.json();
  if (json) {
    dispatch(setConfig(json));
  }
  return json;
};

export const getAppJsonConfigAction = (url:any=null): AppThunk => async (dispatch) => {
  // let lang = i18next.language=="vi"?"":"."+i18next.language;
  url =url?url:site_url( `app.json`);
  let response = await fetch(url);
  let json = await response.json();
  if (json) {
    dispatch(setAppConfig(json));
  }
  return json;
};

export const getConsciousAction = (): AppThunk => async (dispatch) => {
  let url = "https://hcm.ahlupos.com/country.php";
  let response = await fetch(url);
  let json = await response.json();
  return json;
};
export const getDataAdressAction = (): AppThunk => async (dispatch) => {
  console.log("getDataAdressAction", getDataAdressAction)
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await getData(fd);
  console.log("response", response)
  return response;
};
export const updateProfileAction = (
  fullname: string,
  gender: string,
  phone: string,
  cmnd: string,
  street: string,
  province: string,
  province_id: string,
  district: string,
  district_id: string,
  ward: string,
  ward_id: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();

  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    fullname: fullname,
    gender: gender,
    phone: phone,
    cmnd: cmnd,
    street: street,
    province: province,
    province_id: province_id,
    district: district,
    district_id: district_id,
    ward: ward,
    ward_id: ward_id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await updateProfile(fd);
  if (response && response.data.code === 1) {
    Toast.show({
      type: "success",
      text2: response?.data?.message + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: response?.data?.error + " 👋",
    });
  }
};
export const verificationKYCAction = (
  front: any,
  back: any,
  bill: any
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    front: front,
    back: back,
    bill: bill,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await verifyKYC(fd);


  console.log(response.data);
  if (response && response.data.code === 1) {
    Toast.show({
      type: "success",
      text2: response?.data?.message + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: response?.data?.error + " 👋",
    });
  }
};

export const verificationEmaiAction = (email: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    email: email,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await verifyEmail(fd);
  if (response && response.data.code === 1) {
    Toast.show({
      type: "success",
      text2: response?.data?.message + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: response?.data?.error + " 👋",
    });
  }
};
export const updatePassAction = (
  old?: string | undefined,
  newPass?: string | undefined
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    old: old,
    new: newPass,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await updatePass(fd);
  if (response && response.data.code === 1) {
    Toast.show({
      type: "success",
      text2: response?.data?.message + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: response?.data?.error + " 👋",
    });
  }
};
export const getHistoryTodayAcction = (): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await getHistoryToday(fd);
  return response;
};
export const postLoadPointActions = (
  amount: any,
  method: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();

  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    amount: amount,
    method: method,
  };
  // user = _.assign(user, { gender })
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await postLoadPoint(fd);
  if (response && response.data.code === 1) {
    Toast.show({
      type: "success",
      text2: "Tạo lệnh nạp điểm thành công" + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: "Tạo lệnh nạp điểm thất bại" + " 👋",
    });
  }
  return response;
};

export const getListGiftAcction = (): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await getListGift(fd);
  return response;
};
export const postConfirmGiftActions = (id: any): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();

  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await postConfirmGift(fd);
  return response;
};
export const postContinueWithdrawBankAction = (): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await postContinueWithdrawBank(fd);
  if (response && response.data) {
    Toast.show({
      type: "success",
      text2: "Tạo lệnh rút điểm thành công" + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: "Tạo lệnh rút điểm thất bại" + " 👋",
    });
  }
  return response;
};
export const postContinueWithdrawMomoAction = (): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await postContinueWithdrawMomo(fd);
  if (response && response.data) {
    Toast.show({
      type: "success",
      text2: "Tạo lệnh rút điểm thành công" + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: "Tạo lệnh rút điểm thất bại" + " 👋",
    });
  }
  return response;
};
export const postConfirmWithdrawActions = (
  amount: any,
  method: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();

  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    amount: amount,
    method: method,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await postConfirmWithdraw(fd);
  if (response && response.data) {
    if (response.data.code === 1) {
      Toast.show({
        type: "success",
        text2: response.data?.message + " 👋",
      });
    } else {
      Toast.show({
        type: "error",
        text2: response.data?.error + " 👋",
      });
    }
  }
  return response;
};

export const updateOtpAction = (
  old?: string | undefined,
  newPass?: string | undefined
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    old: old,
    new: newPass,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await postUpdateOtp(fd);
  if (response && response.data) {
    if (response.data.code === 1) {
      Toast.show({
        type: "success",
        text2: response.data?.message + " 👋",
      });
    } else {
      Toast.show({
        type: "error",
        text2: response.data?.error + " 👋",
      });
    }
  }
};
export const getCountryDistrictAction = (
  province_id: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("province_id", province_id);
  const response: any = await getListCountry(fd);
  return response;
};
export const getCountryWardsAction = (
  province_id: string,
  district_id: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("province_id", province_id);
  fd.append("district_id", district_id);
  const response: any = await getListCountry(fd);

  return response;
};
export const getListHistoryNeedAction = (
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getListHistoryNeed(fd);
  return response;
};
export const getListHistoryWorkAction = (
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getListHistoryWork(fd);
  return response;
};
export const getListHistoryShopAction = (
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getListHistoryShop(fd);
  return response;
};
export const deleteHistoryNeedAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await deleteHistoryNeed(fd);
  if (response && response.data) {
    if (response.data === 1) {
      Toast.show({
        type: "success",
        text2: "Xoá thành công" + " 👋",
      });
    } else {
      Toast.show({
        type: "error",
        text2: "Xoá thất bại" + " 👋",
      });
    }
  }
  return response;
};
export const deleteHistoryShopAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await deleteHistoryShop(fd);
  if (response && response.data) {
    if (response.data === 1) {
      Toast.show({
        type: "success",
        text2: "Xoá thành công" + " 👋",
      });
    } else {
      Toast.show({
        type: "error",
        text2: "Xoá thất bại" + " 👋",
      });
    }
  }
  return response;
};

export const getDetailHistoryNeedAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getDetailHistoryNeed(fd);
  return response;
};

// getDetailHistoryShop
export const getDetailHistoryShopAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    ...user,
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate as User);
  const response: any = await getDetailShop(fd);
  return response;
};
export const updatePostHistoryAction = (
  id: string,
  image11: string,
  price_from: string,
  price_to: string,
  title: string,
  description: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
    image11: image11,
    price_from: price_from,
    price_to: price_to,
    title: title,
    description: description,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await updatePostHistory(fd);
  if (response && response.data.code === 1) {
    Toast.show({
      type: "success",
      text2: response?.data?.message + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: response?.data?.error + " 👋",
    });
  }
  return response;
};
export const updatePostHistoryShopAction = (
  id: string,
  image11: string,
  title: string,
  description: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
    image11: image11,
    title: title,
    description: description,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await updatePostShopHistory(fd);
  if (response && response.data.code === 1) {
    Toast.show({
      type: "success",
      text2: response?.data?.message + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: response?.data?.error + " 👋",
    });
  }
  return response;
};
export const createPostHistoryNeedAction = (
  nimage: any,
  nimage1: any,
  nimage2: any,
  nimage3: any,
  nimage4: any,
  title: string,
  type: string,
  phone: string,
  price_from: string,
  price_to: string,
  description: string,
  category: string,
  subcategory: string,
  street: string,
  province_id: string,
  province: string,
  district_id: string,
  district: string,
  ward_id: string,
  ward: string,
  timer: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    nimage: nimage,
    nimage1: nimage1,
    nimage2: nimage2,
    nimage3: nimage3,
    nimage4: nimage4,
    title: title,
    type: type,
    phone: phone,
    price_from: price_from,
    price_to: price_to,
    description: description,
    category: category,
    subcategory: subcategory,
    street: street,
    province_id: province_id,
    province: province,
    district_id: district_id,
    district: district,
    ward_id: ward_id,
    ward: ward,
    timer: timer,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await createPostHistoryNeed(fd);
  // console.log(response);
  // if (response && response.data.code === 1) {
  //   Toast.show({
  //     type: "success",
  //     text2: response?.data?.message + " 👋",
  //   });
  // } else {
  //   Toast.show({
  //     type: "error",
  //     text2: response?.data?.error + " 👋",
  //   });
  // }
  return response;
};

export const getPromotionAction = (
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getPromotion(fd);
  return response;
};
export const getDetailPromotionAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    ...user,
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate as User);
  const response: any = await getDetailPromotion(fd);
  return response;
};

export const postCreateEmergencyAction = (
  image1: any,
  image2: any,
  image3: any,
  image4: any,

  title: string,

  phone: string,

  description: string,
  category: string,

  street: string,
  province_id: string,
  province: string,
  district_id: string,
  district: string,
  ward_id: string,
  ward: string,
  timer: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    image1: image1,
    image2: image2,
    image3: image3,
    image4: image4,

    title: title,

    phone: phone,

    description: description,
    category: category,

    street: street,
    province_id: province_id,
    province: province,
    district_id: district_id,
    district: district,
    ward_id: ward_id,
    ward: ward,
    timer: timer,
  };

  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await postCreateEmergency(fd);
  console.log(response);

  // if ((response && response.data.code === 1) || 2) {
  //   Toast.show({
  //     type: "success",
  //     text2: response?.data?.message + " 👋",
  //   });
  // } else {
  //   Toast.show({
  //     type: "error",
  //     text2: response?.data?.error + " ",
  //   });
  // }
  return response;
};

export const postCreateShopAction = (
  type: string,
  title: string,
  phone: string,
  email: string,
  work_from: string,
  work_to: string,
  space: string,
  description: string,
  category: string,
  subcategory: string,
  lat: any,
  lng: any,
  street: string,
  province_id: string,
  province: string,
  district_id: string,
  district: string,
  ward_id: string,
  ward: string,
  image: any,
  image1: any,
  image2: any,
  image3: any,
  wifi_name: string,
  wifi_pass: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = { 
    type: type,
    title: title,
    phone: phone,
    email: email,
    work_from: work_from,
    work_to: work_to,
    space: space,
    description: description,
    category: category,
    subcategory: subcategory,
    lat: lat,
    lng: lng,
    street: street,
    province_id: province_id,
    province: province,
    district_id: district_id,
    district: district,
    ward_id: ward_id,
    ward: ward,
    image: image,
    image1: image1,
    image2: image2,
    image3: image3,
    wifi_name: wifi_name,
    wifi_pass: wifi_pass
  };
  

  
  fd = await convertFormDataCommonFromUser(fd, userUpdate);

 
  const response: any = await postCreateShop(fd);
  // console.log(response.data);

  // if (response && response.data.code === 1) {
  //   Toast.show({
  //     type: "success",
  //     text2: response?.data?.message + " 👋",
  //   });
  // } else {
  //   Toast.show({
  //     type: "error",
  //     text2: response?.data?.error,
  //   });
  // }
  return response;
};

export const getShortTermAction = (): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await getShortTerm(fd);
  return response;
};

export const getCategoryNeedAction = (
  id: string,
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getCategoryNeed(fd);
  return response;
};
export const getCategorySOSAction = (
  id: string,
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getCategorySOS(fd);
  return response;
};

export const getSubCategoryNeedAction = (
  id: string,
  category: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
    category: category,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getSubCategoryNeed(fd);
  return response;
};
export const getSubCategoryNeedJobAction = (
  id: string,
  category: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
    category: category,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getSubCategoryNeed(fd);
  return response;
};

export const getCategoryHomeServiceAction = (
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getCategoryHomeService(fd);
  return response;
};
export const getMemberGroupAction = (): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await getMemberGroup(fd);
  return response;
};

export const getCategoryHomeFoodAction = (): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await getCategoryFood(fd);
  return response;
};

export const getCategoryProductAction = (
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getCategoryProductService(fd);
  return response;
};
export const getCategoryStoreServiceAction = (): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);
  const response: any = await getCategoryStoreService(fd);
  return response;
};

export const getCategoryHomeServiceChildAction = (
  id: string,
  type: string,
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
    type: type,
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getCategoryHomeServiceChild(fd);
  return response;
};

export const getSubCategoryShopAction = (
  id: string,
  type: string,
  category: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: category,
    type: type,
    category: category,
    subcategory: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getSubCategoryNeedShop(fd);
  return response;
};
export const getSubCategoryShopAction2 = (): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user as User);
  const response: any = await getSubCategoryNeedShop(fd);
  return response;
};

export const getCategoryNeedJobAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getCategoryNeedJob(fd);
  return response;
};

export const getEventAction = (): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user as User);
  const response: any = await getEvent(fd);
  return response;
};
export const getListGameAction = (
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getListGame(fd);
  return response;
};
export const getListWifiAction = (
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    page: page,
    limit: limit,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getListWifi(fd);
  // console.log(response);
  return response;
};
export const getDetailWifiAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getDetailWifi(fd);
  return response;
};
export const getInforWifiAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getInforWifi(fd);
  return response;
};

export const getNewByCategoryAction = (url: string): AppThunk => async (
  dispatch
) => {
  const response: any = await getNewByCategory(url);
  return response;
};

export const getUserNotificaionAction = (): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user as User);
  const response: any = await getUserNotification(fd);
  return response;
};

export const getUserNotificaionReportAction = (): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user as User);
  const response: any = await getUserNotificationReport(fd);
  if (response && response.data && response.data.length) {
    dispatch(setUserNotificationReport(response.data[0]));
  }
};

export const likeAction = (id: string): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user as User);
  fd.append("id", id);
  const response: any = await likePost(fd);
  Toast.show({
    type: "success",
    text2: response?.data?.message + " 👋",
  });
  return response;
};

export const likeShopAction = (id: string): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user as User);
  fd.append("id", id);
  const response: any = await likeShop(fd);
  Toast.show({
    type: "success",
    text2: response?.data?.message + " 👋",
  });
  return response;
};

export const saveShopAction = (id: string): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user as User);
  fd.append("id", id);
  const response: any = await saveShop(fd);
  Toast.show({
    type: "success",
    text2: response?.data?.message + " 👋",
  });
  return response;
};

export const postFeedBackAction = (
  name: string,
  email: string,
  description: string,
  categoryChild: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("fullname", name);
  fd.append("email", email);
  fd.append("content", description);
  fd.append("subject", categoryChild);
  const response: any = await postFeedBack(fd);

  if (response && response.data && response.data.code == 1) {
    Toast.show({
      type: "success",
      text2: "Bạn đã góp ý thành công" + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: "Góp ý thất bại " + "👋",
    });
  }
  return response;
};

export const getCountryWardAction = (
  title: string,
  province_id: string,
  district_id: string,
  ward_id: string,
  lat: string,
  lng: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("title", title);
  fd.append("province_id", province_id);
  fd.append("district_id", district_id);
  fd.append("ward_id", ward_id);
  fd.append("lat", lat);
  fd.append("lng", lng);
  const response: any = await getCountry(fd);
  return response;
};
export const getCountryDitrictAction = (
  title: string,
  province_id: string,
  district_id: string,
  lat: string,
  lng: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("title", title);
  fd.append("province_id", province_id);
  fd.append("district_id", district_id);
  fd.append("lat", lat);
  fd.append("lng", lng);
  const response: any = await getCountry(fd);
  return response;
};
export const getCountryProvinceAction = (
  title: string,
  province_id: string,
  lat: string,
  lng: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("title", title);
  fd.append("province_id", province_id);
  fd.append("lat", lat);
  fd.append("lng", lng);
  const response: any = await getCountry(fd);
  return response;
};
export const getCountryNeedWardAction = (
  w_t: string | null,
  title: string,
  province_id: string,
  district_id: string,
  ward_id: string,
  lat: string,
  lng: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("w_t", w_t);
  fd.append("title", title);
  fd.append("province_id", province_id);
  fd.append("district_id", district_id);
  fd.append("ward_id", ward_id);
  fd.append("lat", lat);
  fd.append("lng", lng);
  const response: any = await getCountryNeed(fd);
  return response;
};
export const getCountryNeedDitrictAction = (
  w_t: string | null,
  title: string,
  province_id: string,
  district_id: string,
  lat: string,
  lng: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("w_t", w_t);
  fd.append("title", title);
  fd.append("province_id", province_id);
  fd.append("district_id", district_id);
  fd.append("lat", lat);
  fd.append("lng", lng);
  const response: any = await getCountryNeed(fd);
  return response;
};

export const getCountryNeedProvinceAction = (
  w_t: string | null,
  title: string,
  province_id: string,
  lat: string,
  lng: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("w_t", w_t);
  fd.append("title", title);
  fd.append("province_id", province_id);
  fd.append("lat", lat);
  fd.append("lng", lng);
  const response: any = await getCountryNeed(fd);
  return response;
};

export const postUpdateHistoryShop = (
  arr: any,
  shopId: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  for (const item of arr) {
    const dataChild = item.dataChild;
    const keys = Object.keys(dataChild);

    for (const key of keys) {
      if (!dataChild["title"]) {
        Toast.show({
          type: "error",
          text2: "Vui lòng nhập tên sản phẩm",
        });
        return;
      }

      if (!dataChild["price"]) {
        Toast.show({
          type: "error",
          text2: "Vui lòng nhập giá bán",
        });
        return;
      }
      if (!dataChild["image"]) {
        Toast.show({
          type: "error",
          text2: "Vui lòng chọn ảnh",
        });
        return;
      }
      let price =
        dataChild["price"] != ""
          ? parseFloat(dataChild[`price`].replace(/,/g, "")).toString()
          : "";
      let price_off =
        dataChild["price_off"] != ""
          ? parseFloat(dataChild[`price_off`].replace(/,/g, "")).toString()
          : "";
      let value =
        dataChild[`${key}`] === dataChild["price"]
          ? price
          : dataChild[`${key}`] === dataChild["price_off"]
          ? price_off
          : dataChild[`${key}`];
      fd.append(`products[${item.id}][${key}]`, value);
    }
  }
  fd.append(`id`, shopId);

  const response: any = await updateHistoryshop(fd);
  if (response && response.data && response.data.code == 1) {
    Toast.show({
      type: "success",
      text2: response.data.message + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: response?.data?.error + "👋",
    });
  }
  return response;
};

export const getAdsAction = (): AppThunk => async (dispatch) => {
  const response: any = await getAds();
  return response;
};

export const getCountryPromotionAction = (
  province: string | null,
  page: number,
  limit: number
): AppThunk => async (dispatch) => {
  const fd = new FormData();
  fd.append("province", province);
  fd.append("page", page);
  fd.append("limit", limit);
  const response: any = await getCountryPromotion(fd);
  return response;
};

export const getEmergenctyDetailAction = (
  id: string,
  lat: string,
  lng: string
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    id: id,
    lat: lat,
    lng: lng,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getEmergencyItem(fd);
  return response;
};

export const getCodePromotionAction = (id: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  fd.append("id", id);
  fd = await convertFormDataCommonFromUser(fd, user as User);
  const response: any = await getCodePromotion(fd);
  return response;
};

export const postDevicedAction = (
  mac: string | null,
  token: string | null,
  platform: string | null,
  version: string | null
): AppThunk => async (dispatch) => {
  const fd = new FormData();
  fd.append("mac", mac);
  fd.append("token", token);
  fd.append("platform", platform);
  fd.append("version", version);
  const response: any = await postDeviceInfo(fd);
  return response;
};

export const getCheckinAction = (date: string): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    date: date,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await checkIn(fd);
  return response;
};

export const getSearchShop = (
  params: any
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    title: params?.title,
    province_id: params?.province_id,
    province: params?.province,
    district_id: params?.district_id,
    district: params?.district,
    ward_id: params?.ward_id,
    ward: params?.ward,
    type: params?.type,
    category: params?.category,
    subcategory: params?.subcategory,
    id: params?.id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await searchShop(fd);
  return response;
};
export const getSearchNeed = (
  params: any
): AppThunk => async (dispatch) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
    title: params?.title,
    province_id: params?.province_id,
    province: params?.province,
    district_id: params?.district_id,
    district: params?.district,
    ward_id: params?.ward_id,
    ward: params?.ward,
    type: params?.type,
    category: params?.category,
    subcategory: params?.subcategory,
    id: params?.id,
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await searchNeed(fd);
  return response;
};
export const getLastestNotificationAction = (): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  let userUpdate = {
  };
  fd = await convertFormDataCommonFromUser(fd, userUpdate);
  const response: any = await getNotificationLastest(fd);
  return response;
};


export const testAPI = (): AppThunk => async (
  dispatch
) => {
  let fd = new FormData();
  fd = await convertFormDataCommon(fd, true);
  let user = store.getState().auth.user;
  const response: any = await httpClient.post( "",fd);
  return response;
};

export const getCommentShop = (id_post: string | null): AppThunk => async (
  dispatch
) => {
  const fd = new FormData();
  fd.append("id_post", id_post);
  const response: any = await commentShop(fd);
  return response;
};
export const postCommentNewShop = (
  id: string,
  parent: any,
  created: string,
  modified: string,
  content: string,
  fullname: string,
  profile_picture_url: string | undefined,
  created_by_current_user: boolean,
  upvote_count: any,
  user_has_upvoted: boolean,
  id_post: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();
  if (content === "") {
    Toast.show({
      type: "error",
      text2: "Bạn chưa nhập nội dung bình luận" + " 👋",
    });
    return;
  }
  fd.append("id", id);
  fd.append("parent", parent);
  fd.append("created", created);
  fd.append("modified", modified);
  fd.append("content", content);
  fd.append("fullname", fullname);
  fd.append("profile_picture_url", profile_picture_url);
  fd.append("created_by_current_user", created_by_current_user);
  fd.append("upvote_count", upvote_count);
  fd.append("user_has_upvoted", user_has_upvoted);
  fd.append("id_post", id_post);

  const response: any = await postCommentShopNew(fd);
  if (response && response.data === 1) {
    Toast.show({
      type: "success",
      text2: "Bình luận thành công" + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: "Bình luận thất bại" + " 👋",
    });
  }
  return response;
};
export const postLikeCommentShop = (
  id: string,
  parent: any,
  created: string,
  modified: string,
  content: string,
  fullname: string | undefined,
  profile_picture_url: string | undefined,
  created_by_current_user: boolean,
  upvote_count: any,
  user_has_upvoted: any,
  id_post: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();
  fd.append("id", id);
  fd.append("parent", parent);
  fd.append("created", created);
  fd.append("modified", modified);
  fd.append("content", content);
  fd.append("fullname", fullname);
  fd.append("profile_picture_url", profile_picture_url);
  fd.append("created_by_current_user", created_by_current_user);
  fd.append("upvote_count", upvote_count);
  fd.append("user_has_upvoted", user_has_upvoted);
  fd.append("id_post", id_post);
  const response: any = await postLikeCommentShopNew(fd);
  return response;
};
export const postFixCommentShop = (
  id: string,
  parent: any,
  created: string,
  modified: string,
  content: string,
  fullname: string | undefined,
  profile_picture_url: string | undefined,
  created_by_current_user: boolean,
  upvote_count: any,
  user_has_upvoted: any,
  id_post: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();
  if (content === "") {
    Toast.show({
      type: "error",
      text2: "Bạn chưa nhập nội dung sửa bình luận" + " 👋",
    });
    return;
  }
  fd.append("id", id);
  fd.append("parent", parent);
  fd.append("created", created);
  fd.append("modified", modified);
  fd.append("content", content);
  fd.append("fullname", fullname);
  fd.append("profile_picture_url", profile_picture_url);
  fd.append("created_by_current_user", created_by_current_user);
  fd.append("upvote_count", upvote_count);
  fd.append("user_has_upvoted", user_has_upvoted);
  fd.append("id_post", id_post);
  const response: any = await postFixCommentShopNew(fd);
  if (response && response.data === 0) {
    Toast.show({
      type: "success",
      text2: "Cập nhật bình luận thành công" + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: "Cập nhật bình luận thất bại" + " 👋",
    });
  }
  return response;
};
export const postDeleteCommentShop = (
  id: string,
  parent: any,
  created: string,
  modified: string,
  content: string,
  fullname: string | undefined,
  profile_picture_url: string | undefined,
  created_by_current_user: boolean,
  upvote_count: any,
  user_has_upvoted: any,
  id_post: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();
  fd.append("id", id);
  fd.append("parent", parent);
  fd.append("created", created);
  fd.append("modified", modified);
  fd.append("content", content);
  fd.append("fullname", fullname);
  fd.append("profile_picture_url", profile_picture_url);
  fd.append("created_by_current_user", created_by_current_user);
  fd.append("upvote_count", upvote_count);
  fd.append("user_has_upvoted", user_has_upvoted);
  fd.append("id_post", id_post);
  const response: any = await postDeleteCommentShopNew(fd);
  if (response && response.data === 0) {
    Toast.show({
      type: "success",
      text2: "Xoá bình luận thành công" + " 👋",
    });
  } else {
    Toast.show({
      type: "error",
      text2: "Xoá bình luận thất bại" + " 👋",
    });
  }
  return response;
};
