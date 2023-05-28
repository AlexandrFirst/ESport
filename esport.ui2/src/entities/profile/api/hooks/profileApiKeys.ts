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
};
