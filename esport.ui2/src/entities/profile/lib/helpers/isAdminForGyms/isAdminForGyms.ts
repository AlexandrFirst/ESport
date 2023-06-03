import { IProfile } from "../../../model/types/profile";

export const isAdminForGyms = (profile?: IProfile, gymIds: number[] = []) =>
  profile?.userAdminInfo?.userGyms.some((uGym) =>
    gymIds?.includes(uGym.gymId)
  ) ?? false;
