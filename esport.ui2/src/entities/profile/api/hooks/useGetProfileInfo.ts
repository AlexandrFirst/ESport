import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ProfileApi } from "../profileApi";
import { IProfile } from "../../model/types/profile";
import { useSelectProfile } from "../../model/selectors/select-profile/select-profile";

import { profileApiKeys } from "./profileApiKeys";
import { ApiContext } from "@/shared/types";

export type GetProfileOptions = UseQueryOptions<IProfile, unknown, IProfile>;

export const getProfileInfo = async (userId?: number, ctx?: ApiContext) => {
  try {
    const { data } = await ProfileApi(ctx).getProfileInfo(userId ?? 0);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetProfileInfo = (
  userId?: number,
  forceFetch = true,
  options?: GetProfileOptions
) => {
  const profile = useSelectProfile();

  return useQuery({
    queryKey: profileApiKeys.getProfileById(userId),
    queryFn: async () => getProfileInfo(userId),
    enabled: !!userId && forceFetch ? true : !!profile,
    ...options,
  });
};
