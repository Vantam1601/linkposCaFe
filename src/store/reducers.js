import AsyncStorage from "@react-native-community/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import authReducer from "src/feature/auth/store/reducer";
import cafeReducer from "src/feature/cafe/store/reducer";

const authPersistConfig = {
  key: "auth",
  transforms: [immutableTransform()],
  storage: AsyncStorage,
  // blacklist: ["token", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cafe: cafeReducer,
});

export default rootReducer;
