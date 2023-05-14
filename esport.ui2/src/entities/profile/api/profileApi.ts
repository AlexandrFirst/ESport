import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

import { IProfile } from "../model/types/profile";

export const ProfileApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    getProfileInfo(userId: string) {
      return instance.get<IProfile>(`/user-get/${userId}`);
    },
  };
};
