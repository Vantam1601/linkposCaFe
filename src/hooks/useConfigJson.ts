import { useTypedSelector } from "./useTypedSelector";
import _ from "lodash";
import { JsonConfig, userLocation } from "src/old/type/JsonConfig";

export const useConfig = (): JsonConfig | undefined | null => {
  return useTypedSelector((state) => {
    const result = _.cloneDeep(state.app.json);
    if (result) {
      return result;
    }
    return null;
  });
};
export const useLocation = (): userLocation | undefined | null => {
  return useTypedSelector((state) => {
    const result = _.cloneDeep(state.app.location);
    if (result) {
      return result;
    }
    return null;
  });
};
