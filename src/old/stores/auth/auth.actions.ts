import { AppThunk, store } from "src/old/stores";
import {
  forgotEmail,
  forgotPassword,
  login,
  pointReport,
  profile,
  registers,
} from "./auth.service";
import Toast from "react-native-toast-message";
import { removeToken, saveToken, storage } from "src/helpers/storage";
import {
  convertFormDataCommon,
  convertFormDataCommonFromUser,
} from "src/helpers/constants";
import { logoutActionSlice, setAuthUser, setPointUser } from "./auth.slice";
import { navigate, navigateReset } from "src/navigator/RootNavigation";
import { AppRoutes } from "src/navigator/app-routes";
import { setConfigAxios } from "src/helpers/httpClient";

export const registerAction = (
  phone_user: string,
  email_user: string,
  password_user: string
): AppThunk => async (dispatch) => {
  const fd = new FormData();

  fd.append("phone_user", phone_user);
  fd.append("email_user", email_user);
  fd.append("password_user", password_user);
  const response: any = await registers(fd);
  if (response && response.data && response.data.code == 1) {
    Toast.show({
      type: "success",
      text2: response?.data?.message + " 👋",
    });
    let userInfo = response.data;
    // alert(JSON.stringify(userInfo));
    if (userInfo?.user && userInfo?.user?.w_t) {
      dispatch(
        meAction(userInfo?.user?.w_t, userInfo?.user?.last_login, false)
      );
      saveToken({
        w_t: userInfo?.user?.w_t,
        last_login: userInfo?.user?.last_login,
      });
      setConfigAxios(userInfo?.user?.w_t);
    }
    navigate(AppRoutes.REGISTEROTP,{phone:phone_user,password:password_user,user:userInfo?.user});
    
  } else {
    Toast.show({
      type: "error",
      text2: response?.data?.error + " 👋" ?? "Register failed!",
    });
  }
};
export const loginAction = (
  form: any 
): AppThunk => async (dispatch) => {
  //username,password
  const fd = new FormData();
  for(let i in form){
     fd.append(i, form[i]);
  }
  const response: any = await login(fd);
  // console.log(response.data);
  if (response && response.data && response.data.code === 1) {
    const userInfo = response.data;
    if (userInfo?.user && userInfo?.user?.w_t) {
      dispatch(
        meAction(userInfo?.user?.w_t, userInfo?.user?.last_login, false)
      );
      saveToken({
        w_t: userInfo?.user?.w_t,
        last_login: userInfo?.user?.last_login,
      });
      setConfigAxios(userInfo?.user?.w_t)
    }
    Toast.show({
      type: "success",
      text2: userInfo.message + " 👋",
    });
    navigate(AppRoutes.APP);
  } else {
    Toast.show({
      type: "error",
      text2: response?.data ? response.data.error : "Login failed!",
    });
  }
};
export const forgotPasswordPhone = (phone: string): AppThunk => async (
  dispatch
) => {
  const fd = new FormData();

  fd.append("phone", phone);
  const response: any = await forgotPassword(fd);
  console.log(response);
  if (response && response.data && response.data.code) {
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
export const forgotPasswordEmail = (email: string): AppThunk => async (
  dispatch
) => {
  const fd = new FormData();

  fd.append("email", email);
  const response: any = await forgotEmail(fd);

  if (response && response.data && response.data.code === 1) {
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
export const meAction = (
  w_t: string,
  last_login: string,
  needToken: boolean
): AppThunk => async (dispatch) => {
  let fd = new FormData();

  fd.append("w_t", w_t);
  fd.append("last_login", last_login);

  fd = await convertFormDataCommon(fd, needToken);
  const response: any = await profile(fd);
  if (response && response.data) {
    dispatch(setAuthUser(response.data));
    dispatch(mePointAction());
  } else {
    Toast.show({
      type: "error",
      text2: "Get Profile failed!",
    });
  }
};

export const meActionWithStorage = (): AppThunk => async (dispatch) => {
  let fd = new FormData();

  fd = await convertFormDataCommon(fd, true);
  const response: any = await profile(fd);
  console.log(response);
  
  if (response && response.data) {
    dispatch(setAuthUser(response.data));
  } else {
    setConfigAxios(null)
    Toast.show({
      type: "error",
      text2: "Login again!",
    });
  }
};

export const mePointAction = (): AppThunk => async (dispatch) => {
  let fd = new FormData();

  fd = await convertFormDataCommon(fd, true);
  const user = store.getState().auth.user;
  fd = await convertFormDataCommonFromUser(fd, user);

  const response: any = await pointReport(fd);
  if (response && response.data) {
    dispatch(setPointUser(response.data));
  }
};

export const logoutAction = (): AppThunk => async (dispatch) => {
  removeToken();
  dispatch(logoutActionSlice());
  setConfigAxios(null)
};
