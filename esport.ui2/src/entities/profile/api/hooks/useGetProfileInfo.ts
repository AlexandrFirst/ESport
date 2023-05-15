import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ProfileApi } from "../profileApi";
import { IProfile } from "../../model/types/profile";

export const getProfileKeys = {
  getProfileById: (userId?: string) => ["get-profile-by-id", userId] as const,
};

export type GetProfileOptions = UseQueryOptions<IProfile, unknown, IProfile>;

export const useGetProfileInfo = (
  userId?: string,
  options?: GetProfileOptions
) => {
  return useQuery({
    queryKey: getProfileKeys.getProfileById(userId),
    queryFn: async () => {
      try {
        const { data } = await ProfileApi().getProfileInfo(userId ?? "");
        return data;
      } catch (e) {
        throw e;
      }
    },
    enabled: !!userId,
    ...options,
  });
};
