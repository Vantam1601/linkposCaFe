import _ from "lodash";
import { UserModel } from "../feature/auth/model.tsx/user";
import { useSelector } from "react-redux";
import { RootStateReducer } from "src/store/types";

export const useCurrentUser = (): UserModel | undefined => {
  const result = useSelector<RootStateReducer>((state) => state.auth.user);
  return result;
};
