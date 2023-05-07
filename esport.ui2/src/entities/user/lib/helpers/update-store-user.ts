import {ApiContext, StateSchemaStore} from "@/shared/types";

import {AuthService} from "../../api/auth-api";
import {userActions} from "../../model/slices/userSlice";

// const api = axios.create({ baseURL: "https://localhost/api/auth" });

export const updateStoreUser = async (
  ctx: ApiContext,
  store: StateSchemaStore
) => {
  const { dispatch, getState } = store;
  const { user } = getState();
  if (!user.data) {
    try {
      const { data } = await AuthService(ctx).getUser();
      dispatch(userActions.setUser(data));
    } catch (e: any) {
      // console.log("===e===", e);
    }
  }
};
