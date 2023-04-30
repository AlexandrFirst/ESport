import { IncomingMessage } from "http";

import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { CombinedState } from "redux";

import { StateSchema } from "@/_app/Providers";
import { userActions } from "../../model/slices/userSlice";
import { IUser } from "../../model/types/user";
import axios from "axios";

type UpdateStoreUserResult = {
  ok?: boolean;
  user?: IUser | null;
};

// const api = axios.create({ baseURL: "https://localhost/api/auth" });

export const updateStoreUser = async (
  req: IncomingMessage,
  store: ToolkitStore<CombinedState<StateSchema>>
): Promise<UpdateStoreUserResult> => {
  const [fs, path, https] = await Promise.all([
    import("fs"),
    import("path"),
    import("https"),
  ]);

  const { dispatch, getState } = store;
  const { user: userSchema } = getState();
  if (!userSchema.user) {
    try {
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
        cert: fs.readFileSync(path.resolve(".cerfs", "localhost.pem")),
        key: fs.readFileSync(path.resolve(".cerfs", "localhost-key.pem")),
        passphrase: process.env.LOGIN_API_PASSPHRASE ?? "",
        family: 4,
      });

      const { data } = await axios.get<IUser>(
        `${process.env.LOGIN_API_URL}/info`,
        {
          httpsAgent,
          withCredentials: true,
          headers: {
            // @ts-ignore
            Cookie: `ESport ${req.cookies["ESportCookie"]}`,
          },
        }
      );
      dispatch(userActions.setUser(data));
      return { ok: true, user: data };
    } catch (e) {
      console.log("===e===", e);
      return { ok: false };
    }
  }
  return { ok: true, user: userSchema.user };
};
