import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

import { IProfile } from "../model/types/profile";
import { UpdateProfileInfoRequest } from "./types/types";

export const ProfileApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    getProfileInfo(userId: number) {
      return instance.get<IProfile>(`/user-get/${userId}`);
    },
    updateProfileInfo(data: UpdateProfileInfoRequest) {
      return instance.post<IProfile>("/user-update", data);
    },
  };
};
