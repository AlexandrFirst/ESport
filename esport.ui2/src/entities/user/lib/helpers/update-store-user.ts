import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { CombinedState } from "redux";

import axios from "axios";

import { StateSchema } from "@/_app/Providers";

import { authService } from "../../api/auth-api";
import { userActions } from "../../model/slices/userSlice";
import { IUser } from "../../model/types/user";

type UpdateStoreUserResult = {
  ok?: boolean;
  user?: IUser | null;
};

const api = axios.create({ baseURL: "https://localhost/api/auth" });

export const updateStoreUser = async (
  store: ToolkitStore<CombinedState<StateSchema>>
): Promise<UpdateStoreUserResult> => {
  const { dispatch, getState } = store;
  const { user: userSchema } = getState();
  if (!userSchema.user) {
    try {
      // const httpsAgent = new https.Agent({
      //   rejectUnauthorized: false,
      //   cert: fs.readFileSync(path.resolve(".cerfs", "localhost.pem")),
      //   key: fs.readFileSync(path.resolve(".cerfs", "localhost-key.pem")),
      //   passphrase: process.env.LOGIN_API_PASSPHRASE ?? "",
      //   family: 4,
      // });

      const { data } = await api.get<IUser>(`/get-user`);

      if (!data) {
        return { ok: false };
      }
      dispatch(userActions.setUser(data));
      return { ok: true, user: data };
    } catch (e) {
      console.log("===e===", e);
      return { ok: false };
    }
  }
  return { ok: true, user: userSchema.user };
};
