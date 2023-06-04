import { AdminType } from "../..";
import { GetPendingTrainersRequest } from "../types/types";

export const profileApiKeys = {
  all: ["profile"] as const,
  getProfileById: (userId?: number) =>
    [...profileApiKeys.all, "get-profile-by-id", userId] as const,
  updateProfileInfo: (userId: number) =>
    [
      ...profileApiKeys.all,
      "profileInformation",
      "updateUserInfo",
      userId,
    ] as const,
  confirmMyProfile: (token: string) =>
    [...profileApiKeys.all, "confirmMyProfile", token] as const,
  getPendingAdminsAll: () =>
    [...profileApiKeys.all, "getPendingAdmins"] as const,
  getPendingAdmins: (adminType: AdminType) =>
    [...profileApiKeys.all, "getPendingAdmins", adminType] as const,
  getPendingTrainersAll: () =>
    [...profileApiKeys.all, "getPendingTrainers"] as const,
  getPendingTrainers: (gymId: number, request: GetPendingTrainersRequest) =>
    [...profileApiKeys.all, "getPendingTrainers", gymId, request] as const,
};
