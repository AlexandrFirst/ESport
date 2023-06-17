import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Logger } from "@/shared/lib";

import { ProfileApi } from "../../api/profileApi";

import { profileApiKeys } from "./profileApiKeys";

export const useConfirmMyProfile = (
  token: string,
  options?: UseQueryOptions
) => {
  return useQuery({
    queryKey: profileApiKeys.confirmMyProfile(token),
    queryFn: async () => {
      try {
        const api = await ProfileApi();
        const { data } = await api.confirmMyProfile(token);
        return data;
      } catch (e: any) {
        Logger.Debug(e?.message);
        throw e;
      }
    },
    ...options,
  });
};
