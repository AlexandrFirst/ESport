import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ProfileApi } from "../../api/profileApi";
import { UpdateProfileInfoRequest } from "../types/types";
import { IProfile } from "../..";

export const updateProfileInfoKey = (userId: string) => [
  "profileInformation",
  "updateUserInfo",
  userId,
];

export const useUpdateProfileInfo = (
  userId: string,
  options?: UseMutationOptions<IProfile, unknown, UpdateProfileInfoRequest>
) => {
  return useMutation({
    mutationKey: updateProfileInfoKey(userId),
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
