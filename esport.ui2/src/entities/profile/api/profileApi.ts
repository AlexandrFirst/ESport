import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

import { IProfile } from "../model/types/profile";
import {
  ConfirmAdminRequest,
  GetPendingAdminsRequest,
  GetPendingAdminsResponse,
  UpdateProfileInfoRequest,
} from "./types/types";

export const ProfileApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    getProfileInfo(userId: number) {
      return instance.get<IProfile>(`/user-get/${userId}`);
    },
    updateProfileInfo(data: UpdateProfileInfoRequest) {
      return instance.post<IProfile>("/user-update", data);
    },
    confirmMyProfile(Token: string) {
      return instance.post("/user-email-confirm", { Token });
    },
    getPendingAdmins(request: GetPendingAdminsRequest) {
      return instance.post<GetPendingAdminsResponse>(
        "/pending-admins",
        request
      );
    },
    confirmOrgAdmin(request: ConfirmAdminRequest) {
      return instance.post("/confirm-admin", request);
    },
    confirmGymAdmin(gymId: number, request: ConfirmAdminRequest) {
      return instance.post(`/confirm-gym-admin/${gymId}`, request);
    },
  };
};
