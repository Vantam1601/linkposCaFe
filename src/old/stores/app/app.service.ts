import { httpClient } from "src/helpers/httpClient";
import * as END_POINT from "src/helpers/api.endpoint";
import {
  convertLinkUrlParams,
  convertLinkUrlNoPathParams,
} from "src/helpers/constants";

export const getData = async (data: any) => {
  return httpClient.post(convertLinkUrlNoPathParams(END_POINT.data), data);
};

export const updateProfile = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.update_profile),
    data
  );
};
export const getMemberGroup = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.tree),
    data
  );
};
export const verifyEmail = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.verify_email),
    data
  );
};
export const verifyKYC = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.verify_kyc),
    data
  );
};
export const updatePass = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.update_pass),
    data
  );
};
export const getHistoryToday = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.point, END_POINT.today),
    data
  );
};
export const postLoadPoint = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.point, END_POINT.deposit_handy),
    data
  );
};
export const getListGift = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.gift, END_POINT.list),
    data
  );
};
export const postConfirmGift = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.gift, END_POINT.confirm),
    data
  );
};
export const postContinueWithdrawBank = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.bank),
    data
  );
};
export const postContinueWithdrawMomo = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.momo),
    data
  );
};
export const postConfirmWithdraw = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.point, END_POINT.widthdraw_handy),
    data
  );
};
export const postUpdateOtp = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.update_otp),
    data
  );
};
export const getListCountry = async (data: any) => {
  return httpClient.postNoApi(
    convertLinkUrlNoPathParams(END_POINT.country),
    data
  );
};
export const getListHistoryNeed = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.need),
    data
  );
};
export const getListHistoryWork = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.list_my_view),
    data
  );
};
export const getListHistoryShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.shop),
    data
  );
};
export const deleteHistoryNeed = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.deleteNeed),
    data
  );
};
export const deleteHistoryShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.deleteNeed),
    data
  );
};
export const getDetailHistoryNeed = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.item),
    data
  );
};
export const getDetailHistoryShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.item),
    data
  );
};
export const updatePostHistory = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.update),
    data
  );
};
export const updatePostShopHistory = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.update),
    data
  );
};
export const createPostHistoryNeed = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.create),
    data
  );
};
export const getDetailShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.item),
    data
  );
};

export const likeShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.like),
    data
  );
};

export const saveShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.save),
    data
  );
};

export const getPromotion = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.coupon, END_POINT.home),
    data
  );
};
export const getDetailPromotion = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.coupon, END_POINT.item),
    data
  );
};
export const getCodePromotion = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.coupon, END_POINT.recieve),
    data
  );
};
export const postCreateEmergency = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.emergency, END_POINT.create),
    data
  );
};
export const postCreateShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.create),
    data
  );
};
export const getShortTerm = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.home),
    data
  );
};
export const getCategoryNeed = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.category),
    data
  );
};
export const getCategorySOS = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.emergency, END_POINT.category),
    data
  );
};
export const getSubCategoryNeed = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.subcategory),
    data
  );
};
export const getCategoryFood = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.home_food),
    data
  );
};
export const getCategoryHomeService = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.home_service),
    data
  );
};
export const getCategoryProductService = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.home_product),
    data
  );
};
export const getCategoryStoreService = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.home_product),
    data
  );
};
export const getCategoryHomeServiceChild = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.category),
    data
  );
};
export const getSubCategoryNeedShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.subcategory),
    data
  );
};
export const getCategoryNeedJob = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.category_job),
    data
  );
};

export const getNewByCategory = async (data: any) => {
  return httpClient.postNoApi(END_POINT.rss + `?url=` + data, {});
};

export const getEvent = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.event, END_POINT.home),
    data
  );
};
export const postFeedBack = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.feedback),
    data
  );
};

export const getUserNotification = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.notificaion, END_POINT.user_list)
  );
};
export const getListGame = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.game, END_POINT.list),
    data
  );
};
export const getListWifi = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.wifi, END_POINT.list),
    data
  );
};
export const getDetailWifi = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.wifi, END_POINT.item),
    data
  );
};
export const getInforWifi = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.wifi, END_POINT.itemwifi),
    data
  );
};
export const getCountry = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.countryChild),
    data
  );
};

export const getUserNotificationReport = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.notificaion, END_POINT.report)
  );
};
export const updateHistoryshop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.update_products),
    data
  );
};

export const getAds = async () => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.ads, END_POINT.request),
  );
};
export const getCountryNeed = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.countryChild),
    data
  );
};
export const getCountryPromotion = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.coupon, END_POINT.province),
    data
  );
};
export const getEmergencyItem = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.emergency, END_POINT.item),
    data
  );
};
export const postDeviceInfo = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.user, END_POINT.device),
    data
  );
};

export const likePost = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.like),
    data
  );
};

export const checkIn = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.checkin, END_POINT.check),
    data
  );
};

export const getNotificationLastest = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.notificaion, END_POINT.latest),
    data
  );
}
export const searchShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.search),
    data
  );
};
export const searchNeed = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.needPhp, END_POINT.search),
    data
  );
};
export const commentShop = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.comments),
    data
  );
};
export const postCommentShopNew = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.comments_post),
    data
  );
};
export const postLikeCommentShopNew = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.comments_upvote),
    data
  );
};
export const postFixCommentShopNew = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.comments_update),
    data
  );
};
export const postDeleteCommentShopNew = async (data: any) => {
  return httpClient.post(
    convertLinkUrlParams(END_POINT.shopPhp, END_POINT.comments_delete),
    data
  );
};
// export const getCountryNeedDitrict = async (data: any) => {
//   return httpClient.post(
//     convertLinkUrlParams(END_POINT.needPhp, END_POINT.countryChild),
//     data
//   );
// };
// export const getCountryNeedProvince = async (data: any) => {
//   return httpClient.post(
//     convertLinkUrlParams(END_POINT.needPhp, END_POINT.countryChild),
//     data
//   );
// };
