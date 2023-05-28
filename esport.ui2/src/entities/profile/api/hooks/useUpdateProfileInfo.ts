import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ProfileApi } from "../../api/profileApi";
import { IProfile } from "../../model/types/profile";
import { UpdateProfileInfoRequest } from "../types/types";

import { profileApiKeys } from "./profileApiKeys";

export const useUpdateProfileInfo = (
  userId: number,
  options?: UseMutationOptions<IProfile, unknown, UpdateProfileInfoRequest>
) => {
  return useMutation({
    mutationKey: profileApiKeys.updateProfileInfo(userId),
    mutationFn: async (updateDto: UpdateProfileInfoRequest) => {
      try {
        const { data } = await ProfileApi().updateProfileInfo(updateDto);
        return data;
      } catch (e) {
        throw e;
      }
    },
    ...options,
  });
};
