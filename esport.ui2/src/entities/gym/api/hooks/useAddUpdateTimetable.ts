import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { GymApi, gymApiKeys } from "../..";
import { AddUpdateGymTimetableRequest } from "../types/types";

export const useAddUpdateTimetable = (
  options?: UseMutationOptions<void, unknown, AddUpdateGymTimetableRequest>
) => {
  return useMutation({
    mutationKey: gymApiKeys.addUpdateTimetable(),
    async mutationFn(request: AddUpdateGymTimetableRequest) {
      try {
        const { data } = await GymApi().addUpdateTimetable(
          request.gymId,
          request
        );
        return data;
      } catch (e) {
        throw e;
      }
    },
    ...options,
  });
};
