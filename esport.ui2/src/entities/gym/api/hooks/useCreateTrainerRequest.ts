import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { CreateTrainerRequestRequest } from "../types/types";

import { GymApi } from "../../api/gymApi";
import { gymApiKeys } from "./gymApiKeys";

export const useCreateTrainerRequest = (
  options?: UseMutationOptions<void, unknown, CreateTrainerRequestRequest>
) => {
  return useMutation({
    mutationKey: gymApiKeys.createTrainerRequest(),
    async mutationFn(request: CreateTrainerRequestRequest & { gymId: number }) {
      try {
        const api = await GymApi();
        const { data } = await api.createTrainerRequest(request.gymId, request);
        return data;
      } catch (e) {
        throw e;
      }
    },
    ...options,
  });
};
