import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

import { IProfile } from "../model/types/profile";
import {
  ApprovePendingTrainerRequest,
  ConfirmAdminRequest,
  GetPendingAdminsRequest,
  GetPendingAdminsResponse,
  GetPendingTrainersRequest,
  GetPendingTrainersResponse,
  SetAsLoginDataRequest,
  UpdateProfileInfoRequest,
} from "./types/types";

export const ProfileApi = async (ctx?: ApiContext) => {
  const instance = await Api({ ctx });

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
    setAsLoginData(request: SetAsLoginDataRequest) {
      return instance.post(`/update-user-login`, request);
    },
    getPendingTrainers(gymId: number, request: GetPendingTrainersRequest) {
      return instance.post<GetPendingTrainersResponse>(
        `/gym/${gymId}/pending-trainers`,
        request
      );
    },
    approvePendingTrainer(
      gymId: number,
      request: ApprovePendingTrainerRequest
    ) {
      return instance.post(`gym/${gymId}/trainer/approve`, request);
    },
  };
};
