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
  timeout: 10000,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
  },
});
let myAxiosNoApi = axios.create({
  baseURL: API_URL_NO_API,
  timeout: 10000,
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
    parseFormData ? body : {},
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
  const token =
    "570a4f8dd1d4db2e035385ff19ee8a62346631326362303931336364326631353232663637333666393737363865316632383165356234353836333765393830653935383233643164643565313135367d8402fdf48db3ed0380bb48c451810ba486635835cb94838fe38145d7aa05f4d3bf86f3ac3428fe96461f6848b632bb1f1efa9a1b71adc1a14960c77a85c6b9ae9610591bbab9e6f6a84ffc8719cf3949a794c123960cc92afc64ac700b22f9d8ce40348c01268c1bfdae519ec87ddf3d9077f0b4a5830dd83cf0bee2c576e9a5b759a3e179adba65b62ab4dc5f999594d8ba64358e45c94f89dfb76d47a4f5b3c1a3b538ca01c89d2ad920d67308e15eabe991a306f2693efdbd416734f1e10e59cbbf4c73ef337e38d7000f18c49c1404556cf6a6a3e5799014ae3442f615604f5c25e50483380fc603ca9c9f2d88eb448f24b1edbcc5cee586f6bc33e2fcaae10d0c4d2e02306c886057627838d1a33d08475b96b58515f5146d7e49b4cbb350cef38940af5943fc3ed304f0c9edf8ee7d532e05e42509131efd2785c75662f04dc02f0b0ceafdd7162c0f998153b1ffd72140a726fc0c61e508c5de23889259246fa04a2d67e5f94031489e782f684bc46111bb84dbe6bac2a60e11389f1bec67e90f05c47a6a79b6eb8a5eba6ac25bb4c5d1edccd0001cad408e19d1e768e6835d3bcd6651bcf67af4c7c8030fbcbd0330ed955db12e63fd81a2a55e19d21ce381a74160c071611725a7b2e11f18c53d3748728bd3e407850d1483357d2cce52917ccc627b5e39506c50fc2032f7769b9b546ef9a407532fb651804708627625cb979f42e75a6b41f19a7854e4dfc558a625da4f14883fb01d610ff53b2c6fe0791e1b8cbd7c0a9fb34ffa14efadbd94723e977c9170f5a86f632573e882ecb19ff7706989b5e7158119d352e306b2b782b8d94c7e77e579380fed354d0c68dac861e1d53fbceb58cfbe0de6efcc9b5f5582a7b3d0e0142c1c2c5d59000a1c61badfa76127726f8cce501b2de79f4925b145ea1bd6ee34d44505efbb94ae365b5dd9a0047ae61c4ec61efc0c86d38e7a3a8444444e007c9e8cc4c7403e6e094eb8f456436a0c1fc4d66956228f716e08027db238207f49784150ed7446157877a3b214a960a231c70e980f02b713a8a49ef3b8680f658c8aa986db766c2de9f6f7e9e918a5291a1d53b852578ea55bfafa4c5462d91dcadf8b6a822070a29131df82bffafd1a3fa5a4404c4147d47e133b8e527ed41d34697eb5a7dd4135c84ebe";

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
