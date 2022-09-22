import _ from "lodash";
import { UserPoint } from "src/old/stores/auth/auth.slice";
import { useTypedSelector } from "./useTypedSelector";

export const useCurrentUserPoint = (): UserPoint | null => {
  return useTypedSelector((state) => {
    const result = _.cloneDeep(state.auth.userPoint);
    if (result) {
      return result;
    }
    return null;
  });
};
