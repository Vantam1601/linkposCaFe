import axios from "axios";

import Geolocation from "@react-native-community/geolocation";
import i18next from "i18next";
import moment from "moment";
import { Alert, Linking, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import RNFS from "react-native-fs";
import ImagePickerCrop from "react-native-image-crop-picker";
import ImagePicker from "react-native-image-picker";
import PushNotification from "react-native-push-notification";
import Share from "react-native-share";
import { getStatusBarHeight } from "react-native-status-bar-height";
import toast_ from "react-native-toast-message";
import { AppRoutes } from "src/navigator/app-routes";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { store } from "src/old/stores";
import * as constants from "./constants";
import { storage } from "./storage";

let W_T: any = null;

function run_w_t() {
  if (W_T) return;
  (async () => {
    const [w_t, last_login] = await Promise.all([
      await storage.get("w_t"),
      await storage.get("last_login"),
    ]);

    W_T = w_t;
  })();
}
run_w_t();

export const CURRENCY = "";

export const format_money = (price: any, decimal: any = null) => {
  if (!decimal) decimal = 0;
  price = price.toString();
  var a = price.replace(/[^0-9\.]/gi, "");
  return decimal ? parseFloat(a).toFixed(decimal) : a;
};
export const money_split = (price: any, thousand: any = null) => {
  if (!thousand) thousand = ",";
  price = price.split("").reverse().join("");
  var i = 0;
  var res = [];
  while (i < price.length) {
    res.push(price.slice(i, i + 3));
    i += 3;
  }
  return res.join(thousand).split("").reverse().join("");
};
export const parse_money = (price: any) => {
  if (!price) return 0;
  return price.toString().replace(/[^0-9\.\-]/gi, "");
};
export const show_money_none = (
  price: any,
  thousand: any = null,
  decimal: any = null
) => {
  if (!thousand) thousand = ",";
  if (!decimal) decimal = 0;
  if (!price) return 0;
  price = price.toString();
  var a = price.replace(/[^0-9\.]/gi, "");
  if (a.length <= 3) {
    return format_money(a);
  }
  //spilt
  a = format_money(a, decimal);
  if (a.indexOf(".") != -1) {
    var left = a.substr(0, a.indexOf("."));
    var right = a.substr(a.indexOf(".") + 1);
    if (left.length <= 3) {
      return left + "." + right;
    }
    return money_split(left) + "." + right;
  }
  return money_split(price);
};

export const show_money = (price: any, thousand: any, decimal: any) => {
  if (!price) return price;
  if (!thousand) thousand = ",";
  if (decimal === undefined) decimal = 0;
  price = price.toString();
  var a = price.replace(/[^0-9\.]/gi, "");
  if (a.length <= 3) {
    return format_money(a) + CURRENCY;
  }

  //spilt
  a = format_money(a, decimal);
  if (a.indexOf(".") != -1) {
    var left = a.substr(0, a.indexOf("."));
    var right = a.substr(a.indexOf(".") + 1);
    if (left.length <= 3) {
      return left + "." + right + CURRENCY;
    }
    return money_split(left) + "." + right + CURRENCY;
  }
  return "" + money_split(a) + CURRENCY;
};
export const parse_url = (url: any) => {
  var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }
  return params;
};

export const slugify = function (text: any) {
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeeiiiiooooouuuunc------";

  const newText = text
    .split("")
    .map((letter: any, i: any) =>
      letter.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
    );

  return newText
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-y-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};
export const picker = {
  //https://github.com/ivpusic/react-native-image-crop-picker
  multiple: (options: any = null) => {
    let a = {
      width: 1024,
      height: 860,
      multiple: true,
      cropping: true,
      useFrontCamera: true,
      maxFiles: 20,
      mediaType: "photo",
      compressImageQuality: 0.9,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
    };
    if (options) {
      for (let i in options) {
        a[i] = options[i];
      }
    }
    return new Promise((ok, no) => {
      ImagePickerCrop.clean()
        .then(() => {
          ImagePickerCrop.openPicker(a).then((image) => {
            image = image.map((v) => {
              return {
                uri:
                  Platform.OS === "android"
                    ? v.path
                    : v.path.replace("file://", ""),
                name: `dummy${Date.now()}.jpg`,
                type: "image/*",
              };
            });

            ok(image);
          });
        })
        .catch((e) => {
          ok(null);
        });
    });
  },
  single: (options: any = null) => {
    let a = {
      title: "Chọn ảnh",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      maxWidth: 1024,
      maxHeight: 860,
      quantity: 0.9,
    };
    if (options) {
      for (let i in options) {
        a[i] = options[i];
      }
    }
    return new Promise((ok, no) => {
      ImagePicker.showImagePicker(a, (response) => {
        if (response?.uri) {
          const a = { uri: response };
          let source: any = {
            uri:
              Platform.OS === "android"
                ? a.uri.uri
                : a.uri.uri.replace("file://", ""),
            name:
              a.uri.type == "image/jpeg"
                ? `dummy${Date.now()}.jpg`
                : `dummy${Date.now()}.mp4`,
            type: "image/*",
          };

          ok(source);
        } else if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
          Alert.alert(response.customButton);
        }
      });
    });
  },
};

export const translation = (data: any, key: any, def: any = "") => {
  let message = constants.fetch_lang(key, data);
  return message ? message : def;
};

export const Toast = {
  parse: function (res: any) {
    try {
      res = JSON.parse(res);
    } catch (e) {}
    if (typeof res == "object") {
      if (res.code == 1) {
        toast_.show({
          type: "success",
          text2: "👋 " + res.message,
        });
      } else {
        toast_.show({
          type: "error",
          text2: res.error,
        });
      }
    } else {
      Alert.alert(res);
    }
  },
  alert: function (res: any) {
    Alert.alert(res);
  },
  success: function (res: any, onPress: any = null) {
    toast_.show({
      type: "success",
      text2: "👋 " + res,
      onPress: onPress,
    });
  },
  error: function (res: any, onPress: any = null) {
    toast_.show({
      type: "error",
      text2: res,
      onPress: onPress,
    });
  },
};
export const map = {
  static: function (pos: any, zoom: any = 17) {
    zoom = zoom ? zoom : 17;
    return {
      image:
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/" +
        pos.lng +
        "," +
        pos.lat +
        "," +
        zoom +
        ",0,60/400x250?&access_token=pk.eyJ1IjoiYWhsdSIsImEiOiJja3B0ODM0aXEwMHUzMnZyM21tdnNzc2FvIn0.6dAfESP_bzUMu9t9j2dNSQ",
      url:
        "https://www.google.com/maps/dir/@" + pos.lng + "," + pos.lat + ",16z",
    };
  },
  marker: (title: any, item: any, navigation: any = null) => {
    if (navigation) {
      //{markerA:{},...}
      if (item.markerA) {
        item = JSON.stringify(item);
        let url =
          constants.URL +
          "test/gps/mapbox_marker.php?data=" +
          encodeURIComponent(item);
        console.log(item, url);
        navigation.push(AppRoutes.MYWEBVIEW, {
          title: title ? title : `Map`,
          url: url,
          laucher:
            "<div style='display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;'><div><img src='https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif' width='125' /></div></div>",
          timer: 2,
          hasheader: 1,
        });
      } else {
        GPS().then((p) => {
          item.markerA = p;
          item = JSON.stringify(item);
          let url =
            constants.URL +
            "test/gps/mapbox_marker.php?data=" +
            encodeURIComponent(item);
          console.log(item, url);
          navigation.push(AppRoutes.MYWEBVIEW, {
            title: title ? title : `Map`,
            url: url,
            laucher:
              "<div style='display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;'><div><img src='https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif' width='125' /></div></div>",
            timer: 2,
            hasheader: 1,
          });
        });
      }
    }
  },
};
export const country = {
  data: {},
  init: function (url: any) {
    var me = this;

    return new Promise((resolve, reject) => {
      post(site_url("country.json"), {}, (res: any) => {
        // this.data = res.data;
        me.data.countries = Object.values(res.countries).sort(function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        // console.log(me.data.countries);

        me.data.tinh_tp = Object.values(res.tinh_tp).sort(function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        me.data.quan_huyen = Object.values(res.quan_huyen).sort(function (
          a,
          b
        ) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        me.data.xa_phuong = Object.values(res.xa_phuong).sort(function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        resolve(me.data);
      });
    });
  },
  toCountries: function () {
    return this.data?.countries;
  },
  toProvince: function () {
    return this.data?.tinh_tp;
  },
  toDistrict: function (id: any) {
    let data: any = [];
    this.data.quan_huyen.map((v: any) => {
      if (id == v.parent_code) {
        data.push(v);
      }
    });

    return data;
  },
  toWard: function (id: any) {
    let data: any = [];
    this.data.xa_phuong.map((v: any) => {
      if (id == v.parent_code) {
        data.push(v);
      }
    });

    return data;
  },
};

export const image = {
  default: function (url: any = null) {
    // if(url)return url;
    // const config: any = useTypedSelector((state) => state.app.appJson);
    // if(config && config?.image_thumbnail){
    //    return config?.image_thumbnail;
    // }
    return url ? url : "https://static.thenounproject.com/png/210732-200.png";
  },
};

export const removeAccents = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
export const statusBarHeight = () => {
  let a: any = getStatusBarHeight();
  // alert(a);
  return a >= 44 ? 0 : a;
};

export const isMobile = () => {
  return DeviceInfo.isTablet() == false;
};

export const time = {
  ago: function (time: any) {
    if (!time) return;
    moment.locale(i18next.language);

    return moment(
      typeof time === "string"
        ? new Date(moment(time).toString()).getTime()
        : time
    )
      .fromNow()
      .toString();
  },
  pass: function (countDownDate: any) {
    if (typeof countDownDate == "string") {
      countDownDate = new Date(moment(countDownDate).format());
      countDownDate = countDownDate.getTime();
    } else if (typeof countDownDate == "object") {
      countDownDate = countDownDate.getTime();
    }
    var now = Date.now();

    // Find the distance between now and the count down date
    var distance = now - countDownDate;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  },
  left: function (countDownDate: any) {
    if (typeof countDownDate == "string") {
      countDownDate = new Date(moment(countDownDate).format());
      countDownDate = countDownDate.getTime();
    } else if (typeof countDownDate == "object") {
      countDownDate = countDownDate.getTime();
    }

    // Get today's date and time
    var now = Date.now();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // If the count down is finished, write some text
    if (distance < 0) {
    }

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      render: function () {
        var l = i18next.language;
        switch (l) {
          case "vn":
          case "vi":
            return (
              "còn " +
              this.days +
              "ngày " +
              this.hours +
              "giờ " +
              this.minutes +
              "phút " +
              this.seconds +
              "giây "
            );
            break;
        }
        return (
          this.days +
          "d " +
          this.hours +
          "h " +
          this.minutes +
          "m " +
          this.seconds +
          "s left"
        );
      },
      rendershort: function (f: any = null) {
        var l = i18next.language;
        switch (l) {
          case "vn":
            return (
              "còn " +
              this.days +
              "ngày " +
              this.hours +
              ":" +
              this.minutes +
              ":" +
              this.seconds
            );
            break;
        }
        return f
          ? f(this.days, this.hours, this.minutes, this.seconds)
          : this.days +
              "d " +
              this.hours +
              ":" +
              this.minutes +
              ":" +
              this.seconds +
              " left";
      },
    };
  },
};

export const calDistance = (lat1: any, long1: any, lat2: any, long2: any) => {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (long2 - long1) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d.toFixed(3);
};

export const km = (res: any) => {
  let location = store.getState().app.location;
  if (location) {
    var s = calDistance(
      res.lat,
      res.lng,
      location.latitude,
      location.longitude
    );
    return s != "0.00" ? s + " km" : "";
  }
  return "";
};

export const ADS = {
  enabled: function () {
    const config: any = useTypedSelector((state) => state.app.appJson);
    return !config || !config.ads.enabled ? false : true;
  },
};

export const site_url = (url: string) => {
  return constants.URL + url;
};
export const site_ajax_url = (url: string) => {
  return constants.API_URL + url;
};

export const chooseFile = (options: any = null) => {
  return new Promise((resolve, reject) => {
    options = options
      ? options
      : {
          title: "Chọn ảnh",
          storageOptions: {
            skipBackup: true,
            path: "images",
          },
          cameraType: "front",
          mediaType: "mixed",
          videoQuality: "medium",
          aspectX: 1,
          aspectY: 1,
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.9,
        };
    ImagePicker.showImagePicker(options, (response) => {
      if (response?.uri) {
        const source = { uri: response };

        let a: any = {
          uri:
            Platform.OS === "android"
              ? source.uri.uri
              : source.uri.uri.replace("file://", ""),
          name:
            source.uri.type == "image/jpeg"
              ? `dummy${Date.now()}.jpg`
              : `dummy${Date.now()}.mp4`,
          type: "image/*",
        };

        resolve(a);
      } else if (response.didCancel) {
        reject("User cancelled image picker");
      } else if (response.error) {
        reject("ImagePicker Error: " + response.error);
      } else if (response.customButton) {
        reject("User tapped custom button: " + response.customButton);
      }
    });
  });
};

export const upload = async (server: any, options: any = null) => {
  return new Promise((resolve, reject) => {
    options = options
      ? options
      : {
          title: "Select a Media",
          noData: true,
          takePhotoButtonTitle: "Take Media",
          chooseFromLibraryButtonTitle: "Choose Media",
          cancelButtonTitle: "cancel",
          cameraType: "front",
          mediaType: "mixed",
          videoQuality: "medium",
          aspectX: 1,
          aspectY: 1,
          //allowsEditing: true,
          quality: 1.0,
        };
    ImagePicker.showImagePicker(options, async (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        reject("User cancelled image picker");
      } else if (response.error) {
        reject("ImagePicker Error: " + response.error);
      } else if (response.customButton) {
        reject("User tapped custom button: " + response.customButton);
      } else {
        const source = { uri: response };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log('Image Uri: ');
        // console.log(source);
        // console.log(source.uri.uri);
        let formData = new FormData();
        formData.append("file", {
          uri:
            Platform.OS === "android"
              ? source.uri.uri
              : source.uri.uri.replace("file://", ""),
          name: server.name
            ? server.name
            : source.uri.type == "image/jpeg"
            ? `dummy${Date.now()}.jpg`
            : `dummy${Date.now()}.mp4`,

          type: "image/*",
        });

        if (server.before) {
          server.before(source.uri.uri, formData);
        }
        server.config = server.config
          ? server.config
          : {
              headers: {},
            };

        try {
          const w_t = await storage.get("w_t");

          if (!server.config) {
            server.config.headers = {};
          }

          if (w_t) {
            server.config.headers[constants.AUTH_HEADER] = w_t;
          }
        } catch (ex) {}

        axios.post(server.url, formData, server.config).then((res) => {
          let data = "";
          if (res.status === 200) {
            data = res.data;
            try {
              data = JSON.parse(data.trim());
            } catch (e) {}
            resolve(data);
          }

          resolve(data);
        });
      }
    });
  });
};

export const GPS = () => {
  return new Promise((resolve: any, reject: any) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        // setLocationStatus(error.message);
        resolve({ lat: 0, lng: 0 });
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  });
};
export const postraw = async function (
  url: string,
  data: any,
  func: any,
  config: any = null
) {
  var params = new URLSearchParams();
  for (var i in data) {
    params.append(
      i,
      typeof data[i] == "object" ? JSON.stringify(data[i]) : data[i]
    );
  }

  let location = store.getState().app.location;
  if (location) {
    params.append("lat", location.latitude);
    params.append("lng", location.longitude);
  }

  if (!data.page) {
    params.append("page", "1");
  }
  if (!data.limit) {
    params.append("limit", "20");
  }

  let res: any = await axios.post(
    url,
    params,
    config ? config : { headers: {} }
  );
  res = res.data;

  try {
    res = JSON.parse(res);
  } catch (e) {}

  if (func) func(res);
};
export const post = async function (
  url: string,
  data: any,
  func: any,
  config: any = null
) {
  var params = new URLSearchParams();
  for (var i in data) {
    params.append(
      i,
      typeof data[i] == "object" ? JSON.stringify(data[i]) : data[i]
    );
  }

  let location = store.getState().app.location;
  if (location) {
    params.append("lat", location.latitude);
    params.append("lng", location.longitude);
  }

  config = config ? config : { headers: {} };
  if (W_T) {
    config.headers[constants.AUTH_HEADER] = W_T;
  }

  if (!data.page) {
    params.append("page", "1");
  }
  if (!data.limit) {
    params.append("limit", "20");
  }

  let res: any = await axios.post(url, params, config);
  res = res.data;

  try {
    res = JSON.parse(res);
  } catch (e) {}

  func(res);
};

export const get = async function (url: string, func: any) {
  let res: any = await axios.get(url);
  res = res.data;

  try {
    res = JSON.parse(res);
  } catch (e) {}

  func(res);
};

export const postAsync = async function (
  url: string,
  data: any,
  config: any = null
) {
  var params = new FormData();
  for (var i in data) {
    params.append(
      i,
      typeof data[i] == "object"
        ? data[i]?.uri
          ? data[i]?.uri
          : JSON.stringify(data[i])
        : data[i]
    );
  }

  if (!data.page) {
    params.append("page", "1");
  }
  if (!data.limit) {
    params.append("limit", "20");
  }

  let location = store.getState().app.location;
  if (location) {
    params.append("lat", location.latitude);
    params.append("lng", location.longitude);
  }

  const w_t = await storage.get("w_t");
  if (!config) {
    config = { headers: {} };
    if (w_t) {
      config.headers[constants.AUTH_HEADER] = w_t;
    }
  } else {
    config = config;
  }

  // config =config?config:{headers: {}};

  // const w_t = await storage.get("w_t");

  // console.log(params,config);
  // alert(W_T);
  return axios.post(url, params, config);
};
export const postForm = function (url: string, data: any, config: any = null) {
  return new Promise<any>(async (resolve, reject) => {
    var params = new FormData();
    for (var i in data) {
      params.append(i, data[i]);
    }
    let location = store.getState().app.location;
    if (location) {
      params.append("lat", location.latitude);
      params.append("lng", location.longitude);
    }

    config = config ? config : { headers: {} };
    if (W_T) {
      config.headers[constants.AUTH_HEADER] = W_T;
    }

    config.headers["Content-Type"] = "multipart/form-data";

    let res: any = await axios.post(url, params, config);
    res = res.data;

    try {
      res = JSON.parse(res);
    } catch (e) {}
    resolve(res);
  });
};

const cache_now = {};
export const cache = {
  request: (page: string, func: any) => {
    return new Promise((resolve, reject) => {
      let out = 0;
      if (cache_now[page]) {
        out = 1;
        resolve(cache_now[page]);
      }
      cache.get(page).then((res) => {
        if (res && out == 0) {
          cache_now[page] = res;
          resolve(res);
        }
        if (func) {
          func.then((newData: any) => {
            cache_now[page] = newData;
            cache.set(page, newData);
            if (out == 0) resolve(res);
          });
        }
      });
    });
  },
  get: function (name: string, s: any = null) {
    var file = RNFS.DocumentDirectoryPath + "/" + name + ".cache";
    console.log(file);
    return new Promise(async (resolve, reject) => {
      RNFS.exists(file).then((exists) => {
        if (exists) {
          RNFS.readFile(file, "utf8")
            .then(function (res) {
              try {
                res = JSON.parse(res);
                resolve(res);
              } catch (ex) {
                resolve(s);
              }
            })
            .catch((e) => {
              resolve(s);
            });
        } else {
          resolve(s);
        }
      });
    });
  },
  set: function (name: string, s: any) {
    var file = RNFS.DocumentDirectoryPath + "/" + name + ".cache";
    console.log(file);
    RNFS.writeFile(file, typeof s == "object" ? JSON.stringify(s) : s, "utf8")
      .then(function () {})
      .catch(function (err) {});
  },
};

export const remote = async function () {
  var file = RNFS.DocumentDirectoryPath + "/config.cache";
  // console.log(file);
  let s: any = await cache.get("config", "");
  if (s) return s;
  s = await postAsync(site_url("app.json"), {});
  s = s.data ? s.data : "";
  RNFS.writeFile(file, typeof s == "object" ? JSON.stringify(s) : s, "utf8")
    .then(function () {})
    .catch(function (err) {});

  return s;
};

export const mine = {
  activity: async function (data: any = null) {
    var name = "activity";
    var file = RNFS.DocumentDirectoryPath + "/" + name + ".cache";
    if (data) {
      cache.get(name, []).then(function (res: any) {
        res = res ? res : [];
        res.push(data);
        //
        cache.set(name, res);
      });
    } else {
      // console.log(file);
      let s: any = await cache.get(name, []);
      return s;
    }
  },
  history: async function (data: any = null) {
    /*
    [
      {id:"",title:"",image:"",page:""}
    ]
    */
    var name = "history";
    var file = RNFS.DocumentDirectoryPath + "/" + name + ".cache";
    if (data) {
      cache.get(name, []).then(function (res: any) {
        res = res ? res : [];
        res.push(data);
        //
        cache.set(name, res);
      });
    } else {
      // console.log(file);
      let s: any = await cache.get(name, []);
      return s;
    }
  },
  ads: async function () {
    /*
    [
      {id:"",url:"",image:""}
    ]
    */
    var file = RNFS.DocumentDirectoryPath + "/ads.cache";
    // console.log(file);
    let s: any = await cache.get("ads", "");
    if (s) return s;
    s = await postAsync(site_ajax_url("ads.php?a=my_ads"), {});
    s = s.data ? s.data : "";
    RNFS.writeFile(file, typeof s == "object" ? JSON.stringify(s) : s, "utf8")
      .then(function () {})
      .catch(function (err) {});
    return s;
  },
};

export const notification = {
  getToken: function (fun: any) {
    storage.get("token_device").then((jsonValue) => {
      fun(jsonValue);
    });
  },
  setToken: async function (v: any) {
    await storage.set("token_device", v);
  },
  schedule: function (options: any) {
    PushNotification.localNotificationSchedule({
      subText: options.subtitle ? options.subtitle : "",
      message: options.message ? options.message : "My Notification Message", // (required)
      date: options.timer ? options.timer : new Date(Date.now() + 30 * 1000),
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  },
  local: function (options: any) {
    var settings = {
      /* Android Only Properties */
      channelId: DeviceInfo.getBundleId(), // (required) channelId, if the channel doesn't exist, notification will not trigger.
      subText: options.subtitle ? options.subtitle : "",
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000

      actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      /* iOS only properties */
      subtitle: options.subtitle ? options.subtitle : "", // (optional) smaller title below notification title
      /* iOS and Android properties */
      id: options ? options.id : Date.now(), // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: options.title ? options.title : "", // (optional)
      message: options.message ? options.message : "My Notification Message", // (required)
      userInfo: options.userInfo
        ? options.userInfo
        : {
            // test:Date.now(),
            // page:"home"
          }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: options.sound ? options.sound : true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: options.badge ? options.badge : 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      //repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    };
    //android

    if (options.ticker) {
      settings.ticker = options.ticker;
    }
    if (options.bigText) {
      settings.bigText = options.bigText;
    }
    if (options.largeIconUrl) {
      settings.largeIconUrl = options.largeIconUrl;
    }
    if (options.smallIcon) {
      settings.smallIcon = options.smallIcon;
    }
    if (options.bigPictureUrl) {
      settings.bigPictureUrl = options.bigPictureUrl;
    }

    if (options.bigLargeIconUrl) {
      settings.bigLargeIconUrl = options.bigLargeIconUrl;
    }

    if (typeof options == "object") {
      for (var i in options) {
        settings[i] = options[i];
      }
    }

    if (Platform.OS === "ios") {
      delete settings["channelId"];
    }
    PushNotification.localNotification(settings);
  },
};

export const share = (function () {
  function share(options: any) {
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }
  return {
    text: function (title: any, message: any) {
      message = decodeURIComponent(message);
      const options = Platform.select({
        ios: {
          activityItemSources: [
            {
              // For sharing text.
              placeholderItem: { type: "text", content: message },
              item: {
                default: { type: "text", content: message },
                message: null, // Specify no text to share via Messages app.
              },
              linkMetadata: {
                // For showing app icon on share preview.
                title: message,
              },
            },
          ],
        },
        default: {
          title: title,
          subject: title,
          message: message,
        },
      });
      share(options);
    },
    link: function (title: any, url: any) {
      const options = Platform.select({
        ios: {
          activityItemSources: [
            {
              // For sharing url with custom title.
              placeholderItem: { type: "url", content: url },
              item: {
                default: { type: "url", content: url },
              },
              subject: {
                default: title,
              },
              linkMetadata: { originalUrl: url, url, title },
            },
          ],
        },
        default: {
          title,
          subject: title,
          message: url,
        },
      });
      share(options);
    },
  };
})();

export const utils = {
  getFileExtension3: function (filename: any) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  },
};
export const webview = {
  onShouldStartLoadWithRequest: function (request: any, func: any) {
    // console.log(request.url);

    var matches = request.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    //same domain
    var domain = matches && matches[1];
    // if (server.url.includes(domain)) {
    //   return true;
    // }
    if (request.url.includes("iframe=true")) {
      return true;
    }
    if (request.url.includes("open=true")) {
      Linking.openURL(request.url);
      return false;
    }

    if (request.url.includes("share=")) {
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(request.url))) {
        params[match[1]] = match[2];
      }
      share.text(
        params?.share_title
          ? decodeURIComponent(params?.share_title)
          : "Chia sẻ",
        decodeURIComponent(params?.share)
      );
      return false;
    }

    //ext
    var ext = utils.getFileExtension3(request.url);
    switch (ext) {
      case "mp3":
      case "mp4":
      case "wma":
      case "flv":
      case "mpeg":
        return true;
    }
    // blocked blobs
    if (request.url.startsWith("blob")) {
      Alert.alert("Link cannot be opened.");
      return false;
    }

    if (
      request.url.startsWith("tel:") ||
      request.url.startsWith("mailto:") ||
      request.url.startsWith("maps:") ||
      request.url.startsWith("geo:") ||
      request.url.startsWith("sms:")
    ) {
      Linking.openURL(request.url).catch((er) => {
        console.log("Failed to open Link:", er.message);
      });
      return false;
    } else if (request.url.includes("://share?")) {
      var path = request.url;
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(path))) {
        params[match[1]] = match[2];
      }
      share.text("Chia sẻ", params?.v);
      console.log(params);
      return false;
    } else if (request.url.includes("://add?")) {
      return false;
    } else if (request.url.includes("://send?")) {
      return false;
    }

    if (!/^[data:text, about:blank]/.test(request.url)) {
      if (request.url.startsWith("share:")) {
        var path = request.url.replace("share://", "");
        var regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match;
        while ((match = regex.exec(path))) {
          params[match[1]] = match[2];
        }
        var v = decodeURIComponent(params?.v);
        console.log("share: " + v);
        share.text("Chia sẻ", v);
      } else {
        //skip
        if (
          request.url.startsWith("wvjbscheme://") ||
          request.url.includes("://localhost") ||
          request.url.includes("file:///")
        ) {
          return true;
        }

        if (func) {
          var res = func(request.url);
          if (res === true) {
            return res;
          } else {
            Linking.openURL(request.url);
            return false;
          }
        }
        //open all in default
        Linking.openURL(request.url);
        return false;
      }
    }
    return true;
  },
};
