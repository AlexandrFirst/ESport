import { ApiContext, StateSchemaStore } from "@/shared/types";

import { AuthService } from "../../../api/auth-api";
import { userActions } from "../../../model/slices/userSlice";
import { getRoleArr } from "../get-role-arr/get-role-arr";

export const updateStoreUser = async (
  ctx: ApiContext,
  store: StateSchemaStore
) => {
  const { dispatch, getState } = store;
  const { user } = getState();
  if (!user.data) {
    try {
      const { data } = await AuthService(ctx).getUser();
      const roles = getRoleArr(data.role);
      // console.log("===data, roles===", data, roles);
      dispatch(userActions.setUser({ ...data, id: Number(data.id), roles }));
    } catch (e: any) {
      // console.log("===e===", e);
    }
  }
};
