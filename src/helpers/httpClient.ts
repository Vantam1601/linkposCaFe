import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Alert } from "react-native";
import { API_URL, API_URL_NO_API } from "src/helpers/constants";
// const dispatch = useTypedDispatch();
import i18next from "i18next";
import { AUTH_HEADER } from "src/helpers/constants";
import { ResponseBase } from "src/types/Response";
import { store } from "src/store/store";
let myAxios = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
  },
});
let myAxiosNoApi = axios.create({
  baseURL: API_URL_NO_API,
  timeout: 30000,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request header
myAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response parse
myAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errorData = error?.response?.data?.errors;
    const originalRequest = error.config;
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // const token = await storage.get("refreshToken");
      // if (token) {
      //   try {
      //     originalRequest._retry = true;
      //     await store.dispatch(refreshTokenAction(token));
      //     return myAxios(originalRequest);
      //   } catch (error) {
      //     return Promise.reject(error);
      //   }
      // }
      setTimeout(() => {
        Alert.alert(
          "Thông báo",
          "Vui lòng đăng nhập lại",
          [
            {
              text: "Xác nhận",
              onPress: () => {
                // store.dispatch(logoutAction())
              },
            },
          ],
          { cancelable: false }
        );
      }, 300);
    } else {
      if (errorData && Array.isArray(errorData)) {
        let title = "";
        let detail = "";
        if (errorData.length > 0) {
          title = errorData[0].title;
          detail = errorData[0].detail;
        }
        setTimeout(() => {
          Alert.alert(
            title,
            detail ?? "Có lỗi xảy ra, vui lòng thử lại",
            [
              {
                text: "Xác nhận",
                onPress: () => {},
              },
            ],
            { cancelable: false }
          );
        }, 300);
      }
    }
    return error;
  }
);
const post = <T = ResponseBase<any>>(
  url: string,
  data?: any,
  parseFormData?: boolean,
  config = undefined
) => {
  // console.log(url);
  const token = store.getState().auth.token;
  const defaultConfig: AxiosRequestConfig = {
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      [AUTH_HEADER]: token ? `${token}` : "",
    },
  };

  let body = new FormData();
  if (parseFormData) {
    if (data) {
      Object.keys(data).map((key) => {
        body.append(key, data[key]);
      });
    }
  }
  return myAxios.post<T>(
    url,
    parseFormData ? body : data || {},
    config ?? defaultConfig
  );
};
const postStore = <T = ResponseBase<any>>(
  url: string,
  data?: any,
  parseFormData?: boolean,
  config = undefined
) => {
  const server = store.getState().auth.currentStore.server;
  const token = store.getState().auth.tokenStore;

  const defaultConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      [AUTH_HEADER]: token,
    },
  };

  let body = parseFormData ? new FormData() : data || {};
  if (parseFormData) {
    if (data) {
      Object.keys(data).map((key) => {
        body.append(key, data[key]);
      });
    }
  }

  return myAxios.post<T>(server + url, body, config ?? defaultConfig);
};

const postNoApi = (url: string, data?: any, config = undefined) => {
  data = data ? data : new FormData();
  // data.append("lang", i18next.language);
  // let location = store.getState().app.location;
  // if (location) {
  //   data.append("lat", location.latitude);
  //   data.append("lng", location.longitude);
  // }
  return myAxiosNoApi.post(url, data, config);
};

const get = (url: string, config = {}) => {
  return myAxios.get(url, config);
};

const put = (url: string, data: any, config = {}) => {
  data = data ? data : new FormData();
  // data.append("lang", i18next.language);
  // let location = store.getState().app.location;
  // if (location) {
  //   data.append("lat", location.latitude);
  //   data.append("lng", location.longitude);
  // }
  return myAxios.put(url, data, config);
};

const patch = (url: string, data?: any, config = {}) => {
  // data = data ? data : new FormData();
  // data.append("lang", i18next.language);
  // let location = store.getState().app.location;
  // if (location) {
  //   data.append("lat", location.latitude);
  //   data.append("lng", location.longitude);
  // }
  return myAxios.patch(url, data, config);
};

const del = (url: string, config = {}) => {
  return myAxios.delete(url, config);
};

export function setConfigAxios(accessToken: string | null | undefined) {
  myAxios.defaults.headers.common = {};
  myAxios.defaults.timeout = 12000;
  if (accessToken) {
    myAxios.defaults.headers.common[AUTH_HEADER] = `${accessToken}`;
  }
  myAxiosNoApi.defaults.headers.common = {};
  myAxiosNoApi.defaults.timeout = 12000;
  if (accessToken) {
    myAxiosNoApi.defaults.headers.common[AUTH_HEADER] = `${accessToken}`;
  }
}

export type NetWorkResponseType<T> = () => Promise<AxiosResponse<T>>;

const httpClient = {
  post,
  get,
  put,
  patch,
  delete: del,
  postNoApi,
  setConfigAxios,
  postStore,
};

export { httpClient };
