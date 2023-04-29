import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { CombinedState } from "redux";

import { StateSchema } from "@/_app/Providers";

import { authService } from "../../api/auth-api";
import { userActions } from "../../model/slices/userSlice";
import { IUser } from "../../model/types/user";

type UpdateStoreUserResult = {
  ok?: boolean;
  user?: IUser | null;
};

export const updateStoreUser = async (
  store: ToolkitStore<CombinedState<StateSchema>>
): Promise<UpdateStoreUserResult> => {
  const { dispatch, getState } = store;
  const { user: userSchema } = getState();
  if (!userSchema.user) {
    try {
      const { data } = await authService.getUser();

      if (!data) {
        return { ok: false };
      }
      dispatch(userActions.setUser(data));
      return { ok: true, user: data };
    } catch (e) {
      return { ok: false };
    }
  }
  return { ok: true, user: userSchema.user };
};
